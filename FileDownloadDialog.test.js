/* eslint-disable max-len */

import React from 'react'
import {shallow, configure} from 'enzyme'
import FileDownloadDialog from '../components/FileDownloadDialog'
import ReactDOM from 'react-dom'
import {CanvasDropdown} from 'rf-canvas'
import {describe, expect, beforeAll, jest} from '@jest/globals'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})

describe('FileDownloadDialog test cases', function () {
  let component = null
  let props = null
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element
    })
  })

  afterEach(() => {
    ReactDOM.createPortal.mockClear()
  })

  beforeEach(() => {
    let mockonSubmit = jest.fn()
    let mockhandleHide = jest.fn()

    props = {
      onSubmit: mockonSubmit,
      isOpen: true,
      showTicketInfo: true,
      handleHide: mockhandleHide,
      troubleReportNum: [
        {
          label: 'VZE4567890',
          value: 'VZE4567890'
        },
        {
          label: 'VZE4567891',
          value: 'VZE4567891'
        }
      ],
      attachmentData: [
        {
          value: '334001',
          label: '911_MASTARS.docx'
        },
        {
          value: '334021',
          label: 'IRs query .txt'

        }
      ],
      attachmentFiles: {
        fileAttachmentresponse: [
          {
            attachmentDateTime: '07/13/2020 07:54 GMT',
            attachmentDescription: 'ATTACHMENT 1',
            attachmentFileName: '911_MASTARS.docx',
            attachmentFileSize: '743679',
            attachmentId: '334001',
            attachmentType: 'FILE',
            attachmentView: 'Service'
          },
          {
            attachmentDateTime: '07/13/2020 07:54 GMT',
            attachmentDescription: '2ND ATTACHMENT',
            attachmentFileName: 'IRs query .txt',
            attachmentFileSize: '323',
            attachmentId: '334021',
            attachmentType: 'FILE',
            attachmentView: 'Service'
          }
        ],
        totalcount: 2
      }
    }

    component = shallow(<FileDownloadDialog {...props} />)
  })

  it('Should ModalHeader exist or not', function () {
    expect(component.find('ModalHeader').exists()).toBeTruthy()
  })

  it('Should check dropdown length', function () {
    expect(component.find('Dropdown').length).toBe(2)
  })

  it('Should check first dropdown label text', function () {
    let firstDrpdwnText = component.find(CanvasDropdown).at(0).dive().find('.dropdown-label').text()
    expect(firstDrpdwnText).toBe('Ticket*')
  })

  it('Should check first dropdown values length', function () {
    let firstDrpdwnValues = component.find(CanvasDropdown).at(0).dive().find('SingleDropdown').dive().find('Dropdown').dive().find('DropdownItem')
    expect(firstDrpdwnValues.length).toBe(2)
  })

  it('Should check second dropdown label text', function () {
    let secondDrpdwnText = component.find(CanvasDropdown).at(1).dive().find('.dropdown-label').text()
    expect(secondDrpdwnText).toBe('Select Attachment Name *')
  })

  it('Should check second dropdown values length', function () {
    let secondDrpdwnValues = component.find(CanvasDropdown).at(1).dive().find('SingleDropdown').dive().find('Dropdown').dive().find('DropdownItem')
    expect(secondDrpdwnValues.length).toBe(2)
  })

  it('Should check Ticket dropdown value changing or not using change event', function () {
    component.find(CanvasDropdown).at(0).simulate('change', 'VZE4567891')
    let firstDrpdwnValue = component.find(CanvasDropdown).at(0).dive().find('SingleDropdown').dive().find('Dropdown').dive().find('.sd-dropdown-label').text()
    expect(firstDrpdwnValue).toBe('VZE4567891')
  })

  it('Should check Attachment dropdown value changing or not using change event', function () {
    component.find(CanvasDropdown).at(1).simulate('change', '334021')
    let secondDrpdwnValue = component.find(CanvasDropdown).at(1).dive().find('SingleDropdown').dive().find('Dropdown').dive().find('.sd-dropdown-label').text()
    expect(secondDrpdwnValue).toBe('IRs query .txt')
  })

  it('Should check Download button available', function () {
    let dwnldBtn = component.find('.st-modal-action-bar Button').first().dive().text()
    expect(dwnldBtn).toBe('Download')
  })

  it('Should check Cancel button available', function () {
    let cancelBtn = component.find('.st-modal-action-bar Button').at(1).dive().text()
    expect(cancelBtn).toBe('Cancel')
  })

  it('Should check Download Button Called - Success', function () {
    component.find(CanvasDropdown).at(1).simulate('change', '334021')
    component.find('.st-modal-action-bar Button[type="primary"]').simulate('click')
    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('Should check Download Button Called - Fail with Ticket', function () {
    component.find('.st-modal-action-bar Button[type="primary"]').simulate('click')
    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })

  it('Should check Download Button Called - Fail with Attachment', function () {
    component.find(CanvasDropdown).at(0).simulate('change', '')
    component.find('.st-modal-action-bar Button[type="primary"]').simulate('click')
    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })

  it('Should check cancel button calles', function () {
    component.find('.st-modal-action-bar Button[type="secondary"]').simulate('click')
    expect(props.handleHide).toHaveBeenCalledTimes(1)
  })
})
