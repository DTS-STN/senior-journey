import { MetricOptions, metrics } from '@opentelemetry/api'

const METER_NAME = 'seniors-journey'

/**
 * Creates a new `Counter` metric. Generally, use this kind of metric when the value is a quantity, the sum is of
 * primary interest, and the event count and value distribution are not of primary interest.
 */
export function createCounter(name: string, options?: MetricOptions) {
  return metrics.getMeter(METER_NAME).createCounter(name, options)
}

/**
 * Creates and returns a new `Histogram`.
 */
export function createHistogram(name: string, options?: MetricOptions) {
  return metrics.getMeter(METER_NAME).createHistogram(name, options)
}

/**
 * Creates a new `UpDownCounter` metric. UpDownCounter is a synchronous instrument and very similar to Counter except
 * that the add function supports negative increments. It is generally useful for capturing changes in an amount of
 * resources used, or any quantity that rises and falls during a request.
 *
 * Example uses for UpDownCounter:
 * <ol>
 *   <li> count the number of active requests. </li>
 *   <li> count memory in use by instrumenting new and delete. </li>
 *   <li> count queue size by instrumenting enqueue and dequeue. </li>
 *   <li> count semaphore up and down operations. </li>
 * </ol>
 */
export function createUpDownCounter(name: string, options?: MetricOptions) {
  return metrics.getMeter(METER_NAME).createUpDownCounter(name, options)
}
