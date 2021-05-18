/* eslint-disable no-console */

import mockAxios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import * as selectAction from '../actions/getAvailableWidgets'
import * as selectAction from '../../../../redux/vRepair/actions/closeTickets'

import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})
const postData = [{ticketId: 'MAIY017800'}]
describe.only('Test canvas testwidget action', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions()
  })

  it('should dispatch action for failed API call', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.reject(new Error('error')))
    const actualRes = await store.dispatch(selectAction.actionCloseVrepairTicket())
    expect(actualRes).toEqual('error')
  })
  const mockData = {
    status: 'PARTIAL',
    errorInfo: [
      {
        ticketId: 'VZ7C010223',
        eventId: '79641774',
        error: 'Error: connect ETIMEDOUT 146.1.252.71:28918\n' +
                    '    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1106:14)'
      },
      {
        ticketId: 'VZ7C010223',
        eventId: '79641774',
        error: 'Error: connect ETIMEDOUT 146.1.252.71:28918\n' +
                    '    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1106:14)'
      }
    ],
    closed: [
      {
        ticketId: 'VZ7C010222',
        eventId: '79641772',
        response: ''
      },
      {
        ticketId: 'VZ7C010222',
        eventId: '79641772',
        response: ''
      }
    ]
  }
  const successMockData = {
    'status': 'SUCCESS',
    'closed': [
      {
        'ticketId': 'VZ7C010223',
        'eventId': '79641774',
        'response': ''
      },
      {
        'ticketId': 'VZ7C010223',
        'eventId': '79641774',
        'response': ''
      }
    ]
  }
  const errorMockData = {
    'status': 'FAILED',
    'errorInfo': [
      {
        'ticketId': 'VZ7C010223',
        'eventId': '79641774',
        'error': 'Error: connect'
      }
    ]
  }
  it('should dispatch action for error API call', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({data: errorMockData, status: 400})
    )
    const reciveData = await store.dispatch(selectAction.actionCloseVrepairTicket(postData))
    expect(reciveData.status).toEqual(errorMockData.status)
  })
  it.skip('should dispatch action for Success API call', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({data: successMockData, status: 200})
    )
    const reciveData = await store.dispatch(selectAction.actionCloseVrepairTicket(postData))
    expect(reciveData.status).toEqual(successMockData.status)
  })
  it('should dispatch action for Partial Success API call', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({data: mockData, status: 200})
    )
    const reciveData = await store.dispatch(selectAction.actionCloseVrepairTicket(postData))
    expect(reciveData.status).toEqual(mockData.status)
  })
})
