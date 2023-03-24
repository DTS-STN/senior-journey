import { metrics } from '@opentelemetry/api'
import { createCounter, createHistogram, createUpDownCounter } from '../../src/utils/metrics'

describe('metrics', () => {
  const mockedCreateCounter = jest.fn();
  const mockedCreateHistogram = jest.fn();
  const mockedCreateUpDownCounter = jest.fn();

  const meter = metrics.getMeter('')
  meter.createCounter = mockedCreateCounter
  meter.createHistogram = mockedCreateHistogram
  meter.createUpDownCounter = mockedCreateUpDownCounter

  beforeEach(() => {
    mockedCreateCounter.mockClear();
    mockedCreateHistogram.mockClear();
    mockedCreateUpDownCounter.mockClear();
  })

  it('createCounter() delegates to OpenTelemetry API', () => {
    createCounter('')
    expect(mockedCreateCounter).toBeCalled()
  })

  it('createHistogram() delegates to OpenTelemetry API', () => {
    createHistogram('')
    expect(mockedCreateHistogram).toBeCalled()
  })

  it('createUpDownCounter() delegates to OpenTelemetry API', () => {
    createUpDownCounter('')
    expect(mockedCreateUpDownCounter).toBeCalled()
  })
})