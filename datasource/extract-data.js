'use strict'

const fs = require('fs')

const cheerio = require('cheerio')
const generateUuid = require('uuid').v4

const worldcupMatchesFifaComHtml = fs.readFileSync('./worldcup-matches-fifa.com.html', 'utf-8')
const $ = cheerio.load(worldcupMatchesFifaComHtml)

function formatTeam (str) {
  return str
    .replace(/^1([A-H]+)$/, '1er du groupe $1')
    .replace(/^2([A-H]+)$/, '2e du groupe $1')
    .replace(/^W([0-9]+)$/, 'Vainqueur du Match $1')
    .replace(/^L([0-9]+)$/, 'Perdant du Match $1')
}

const teamsCache = {}

const games = Array.from($('.fi-matchlist .fi-mu'))
  .map((e, idx) => {

    const id = generateUuid()
    const name = `Match ${idx + 1}`

    const head = $(e).parent().find('.fi-mu-list__head').text()
    const phase = head.includes('juin')
      ? 'Groupes'
      : head.replace(/\s+/gm, ' ').trim()

    const $dateNode = $(e).find('.fi-s__score.fi-s__date-HHmm')
    const monthDay = $dateNode.attr('data-daymonthutc').replace(/([0-9][0-9])([0-9][0-9])/, '$2-$1')
    const time = $dateNode.attr('data-timeutc')
    const cityUtcShift = Number($dateNode.attr('data-timeshiftutc'))
    const startsAt = `2018-${monthDay}T${time}:00.000Z`

    const stadium = $(e).find('.fi__info__stadium').text()
    const city = $(e).find('.fi__info__venue').text()
    const group = $(e).find('.fi__info__group').text().replace('Groupe ', '')

    const teamNames = Array.from($(e).find('.fi-t__nText')).map((e) => $(e).text())
    const teamCodes = Array.from($(e).find('.fi-flag--4')).map((e) => $(e).attr('alt'))

    const teams = teamNames.map((name, i) => {
      const countryName = formatTeam(name)
      let team = teamsCache[countryName]
      if (team == null) {
        team = { id: generateUuid(), countryName }
        if (phase === 'Groupes') {
          team.countryCode = teamCodes[i]
          team.group = group
        }
        teamsCache[countryName] = team
      }
      return team
    })

    return { id, name, phase, startsAt, stadium, city, cityUtcShift, teams }
  })

const json = JSON.stringify(games, null, '    ')
fs.writeFileSync('./extracted-data.json', json, 'utf-8')
