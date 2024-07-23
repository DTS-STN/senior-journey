# The following labels should be set at build time.. sane defaults are provided as a fallback
#
# example command:
# 	- $ docker build . \
# 			--build-arg BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
# 			--build-arg BUILD_ID="0001" \
# 			--build-arg BUILD_REVISION="$(git rev-parse --short=8 HEAD)" \
# 			--build-arg BUILD_VERSION="$(date -u +%Y%m%d)-0001-$(git rev-parse --short=8 HEAD)"
ARG BUILD_DATE=1970-01-01T00:00:00.000Z
ARG BUILD_ID=0000
ARG BUILD_REVISION=00000000
ARG BUILD_VERSION=19700101-0000-00000000

FROM docker.io/node:22.5.1-bookworm-slim AS base



# Install dependencies only when needed
FROM base AS deps

WORKDIR /home/node
COPY --chown=node:node package*.json ./

USER node
RUN npm ci



# Rebuild the source code only when needed
FROM base AS builder

ARG BUILD_DATE
ARG BUILD_ID
ARG BUILD_REVISION
ARG BUILD_VERSION

ENV BUILD_DATE=${BUILD_DATE}
ENV BUILD_ID=${BUILD_ID}
ENV BUILD_REVISION=${BUILD_REVISION}
ENV BUILD_VERSION=${BUILD_VERSION}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /home/node
COPY --chown=node:node --from=deps /home/node/node_modules ./node_modules
COPY --chown=node:node ./ ./

USER node
RUN npm run build



# Production image, copy all the files and run next
FROM base AS runner

ARG BUILD_DATE
ARG BUILD_REVISION
ARG BUILD_VERSION

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

LABEL org.opencontainers.image.authors="Digital Technology Solutions"
LABEL org.opencontainers.image.url="https://github.com/DTS-STN/"
LABEL org.opencontainers.image.vendor="Employment and Social Development Canada"
LABEL org.opencontainers.image.title="Journey Labs"
LABEL org.opencontainers.image.description="Journey Labs -- Seniors Journey"

LABEL org.opencontainers.image.created=${BUILD_DATE}
LABEL org.opencontainers.image.version=${BUILD_VERSION}
LABEL org.opencontainers.image.revision=${BUILD_REVISION}

WORKDIR /home/node
COPY --chown=node:node --from=builder /home/node/public ./public
COPY --chown=node:node --from=builder /home/node/.next ./.next
COPY --chown=node:node --from=builder /home/node/next.config.js ./next.config.js
COPY --chown=node:node --from=builder /home/node/next-i18next.config.js ./next-i18next.config.js
COPY --chown=node:node --from=builder /home/node/package*.json ./

USER node
RUN npm ci --omit=dev

CMD npm run start
EXPOSE 3000
