/**
 * This file initializes OpenTelemetry for the application using the @opentelemetry/sdk-node package.
 *
 * Two Dynatrace exporters are provided, and rely on the following (optional) environment variables:
 *
 * <ul>
 *   <li>
 *     OTEL_METRICS_ENDPOINT -- defines the Dynatrace OpenTelemetry metrics endpoint
 *     (ex: https://example.com/e/00000000-0000-0000-0000-000000000000/api/v2/otlp/v1/metrics)
 *   </li>
 *   <li>
 *   - OTEL_TRACES_ENDPOINT -- defines the Dynatrace Opentelemetry traces endpoint
 *     (ex: https://example.com/e/00000000-0000-0000-0000-000000000000/api/v2/otlp/v1/traces)
 *   </li>
 *   <li>
 *   - OTEL_API_KEY -- defines the Dynatrace API key used by the metrics and traces endpoint
 *   </li>
 * </ul>
 *
 * If either Dynatrace endpoint is not provided, a NOOP metrics and/or a NOOP traces exporter will be configured.
 *
 * NOTE: to ensure that tracing is fully initialized, NodeSDK must be initialized early during runtime.
 * For Next.js, this can be done by importing this file in next.config.js.
 *
 * NOTE: because of limitations in the Next.js runtimes, metrics cannot be emitted from middleware.
 *
 * References:
 *
 * <ul>
 *   <li>https://www.npmjs.com/package/@opentelemetry/sdk-node</li>
 *   <li>https://www.dynatrace.com/support/help/extend-dynatrace/opentelemetry</li>
 *   <li>https://nextjs.org/docs/api-reference/edge-runtime</li>
 * </ul>
 */

const log = require('next/dist/build/output/log')

const { ExportResultCode } = require('@opentelemetry/core')
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto')
const { CompressionAlgorithm } = require('@opentelemetry/otlp-exporter-base')
const { envDetector, hostDetector, osDetector, processDetector, Resource } = require('@opentelemetry/resources')
const { AggregationTemporality, MeterProvider, PeriodicExportingMetricReader, PushMetricExporter } = require('@opentelemetry/sdk-metrics')
const { SpanExporter } = require('@opentelemetry/sdk-trace-base')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { NodeSDK } = require('@opentelemetry/sdk-node')

/** @returns {PushMetricExporter} */
function getMetricExporter() {
  const exportMetrics = process.env.OTEL_METRICS_ENDPOINT

  if (exportMetrics) {
    if (!process.env.OTEL_API_KEY) {
      throw new Error('OTEL_API_KEY must be configured when OTEL_METRICS_ENDPOINT is set')
    }

    log.info(`Exporting metrics to ${process.env.OTEL_METRICS_ENDPOINT} every ${getMetricExportInterval()} ms`)

    return new OTLPMetricExporter({
      compression: CompressionAlgorithm.GZIP,
      headers: { 'Authorization': `Api-Token ${process.env.OTEL_API_KEY}` },
      temporalityPreference: AggregationTemporality.DELTA,
      url: process.env.OTEL_METRICS_ENDPOINT
    })
  }

  log.info('Metrics exporting is disabled; set OTEL_METRICS_ENDPOINT to enable.')

  return {
    // a no-op PushMetricExporter implementation
    export: (metrics, resultCallback) => resultCallback({ code: ExportResultCode.SUCCESS }),
    forceFlush: async () => {},
    shutdown: async () => {}
  }
}

/** @returns {number} */
function getMetricExportInterval() {
  return parseInt(process.env.OTEL_METRICS_EXPORT_INTERVAL_MILLIS ?? '60000')
}

/** @returns {number} */
function getMetricTimeout() {
  return parseInt(process.env.OTEL_METRICS_EXPORT_TIMEOUT_MILLIS ?? '30000')
}

/** @returns {SpanExporter} */
function getTraceExporter() {
  const exportTraces = process.env.OTEL_TRACES_ENDPOINT

  if (exportTraces) {
    if (!process.env.OTEL_API_KEY) {
      throw new Error('OTEL_API_KEY must be configured when OTEL_TRACES_ENDPOINT is set')
    }

    log.info(`Exporting traces to ${process.env.OTEL_TRACES_ENDPOINT} every 30000 ms`)

    return new OTLPTraceExporter({
      compression: CompressionAlgorithm.GZIP,
      headers: { 'Authorization': `Api-Token ${process.env.OTEL_API_KEY}` },
      url: process.env.OTEL_TRACES_ENDPOINT,
    })
  }

  log.info('Traces exporting is disabled; set OTEL_TRACES_ENDPOINT to enable.')

  return {
    // a no-op SpanExporter implementation
    export: (spans, resultCallback) => resultCallback({ code: ExportResultCode.SUCCESS }),
    shutdown: async () => {}
  }
}

log.info(`Initializing OpenTelemetry SDK...`)

new NodeSDK({
  metricReader: new PeriodicExportingMetricReader({
    exporter: getMetricExporter(),
    exportIntervalMillis: getMetricExportInterval(),
    exportTimeoutMillis: getMetricTimeout()
  }),
  resource: new Resource({
    // Note: any attributes added here must be configured in Dynatrace under
    // Settings → Metrics → OpenTelemetry metrics → Allow list: resource and scope attributes
    //
    // see: node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js
    // see: node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticResourceAttributes.js
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.OTEL_ENVIRONMENT ?? 'local',
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'seniors-journey',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.BUILD_VERSION ?? '00000000-0000-00000000'
  }),
  resourceDetectors: [envDetector, hostDetector, osDetector, processDetector],
  traceExporter: getTraceExporter(),
}).start()
