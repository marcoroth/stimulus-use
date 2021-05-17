import { expect } from 'chai'
import { getIdentifier } from '../../src/use-power-move/use-power-move'

describe('usePowerMove tests', function () {
  it('should return the correct identifier', function () {
    expect(getIdentifier("clipboard")).to.equal("clipboardController")
  })

  it('should return the right suffix', function () {
    expect(getIdentifier("clipboard", true)).to.equal("clipboardController")
    expect(getIdentifier("clipboard", false)).to.equal("clipboard")
    expect(getIdentifier("clipboard", "")).to.equal("clipboard")
    expect(getIdentifier("clipboard", null)).to.equal("clipboard")
    // expect(getIdentifier("clipboard", undefined)).to.equal("clipboard")
    expect(getIdentifier("clipboard", "anything")).to.equal("clipboardAnything")
    expect(getIdentifier("clipboard", "anything_underscore")).to.equal("clipboardAnythingUnderscore")
  })

  it('should handle underscores in identifiers', function () {
    expect(getIdentifier("date_picker")).to.equal("datePickerController")
    expect(getIdentifier("date_picker", false)).to.equal("datePicker")
  })

  it('should handle dashes in identifiers', function () {
    expect(getIdentifier("local-time")).to.equal("localTimeController")
    expect(getIdentifier("local-time", false)).to.equal("localTime")
  })

  it('should emit namespaces in identifiers', function () {
    expect(getIdentifier("users--list-item")).to.equal("listItemController")
    expect(getIdentifier("users--list-item", false)).to.equal("listItem")
  })

  it('should keep namespace', function () {
    expect(getIdentifier("users--list-item"), true, true).to.equal("usersListItemController")
    expect(getIdentifier("users--users--list-item"), true, true).to.equal("usersUsersListItemController")
    expect(getIdentifier("users--users--users--list-item"), true, true).to.equal("usersUsersUsersListItemController")
  })

  it('should keep namespace and remove suffix', function () {
    expect(getIdentifier("users--list-item"), false, true).to.equal("usersListItem")
    expect(getIdentifier("users--users--list-item"), false, true).to.equal("usersUsersListItem")
    expect(getIdentifier("users--users--users--list-item"), false, true).to.equal("usersUsersUsersListItem")
  })
})
