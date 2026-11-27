# Credits

This project is licensed under the [Apache License 2.0](./LICENSE).
This file lists third-party material and acknowledgements.

## Inspiration

- [The Great Escape](https://github.com/t-gmn/the-great-escape) by t-gmn

## Screenshots

These screenshots were created by K8s Escape Room contributors. Their project license is Apache-2.0.

| File | Source | License |
|------|--------|---------|
| `.images/github-codespaces-create.png` | K8s Escape Room contributors | Apache-2.0 |
| `.images/github-codespaces-ports.png` | K8s Escape Room contributors | Apache-2.0 |
| `.images/k8s-escape-room-terminal.png` | K8s Escape Room contributors | Apache-2.0 |
| `.images/k8s-escape-room-web-unsolved.png` | K8s Escape Room contributors | Apache-2.0 |

## Images

All pictures were AI-generated with [NightCafé](https://creator.nightcafe.studio/) and are provided as-is.
According to the [NightCafé terms](https://nightcafe.studio/policies/terms-of-service), the rights in generated artworks belong to the creator and may be used commercially.
NightCafé gives no warranty that copyright can be claimed in AI-generated artwork or that it does not infringe third-party rights, and neither do we.

The inventory below records the current asset attributions. `Apache-2.0` is the project license attribution; it is not a warranty of ownership or non-infringement. Entries marked **TODO: Verify** have unresolved source or license information.

| File | Source | License / status |
|------|--------|------------------|
| `init.d/02.frontend/escape-room-frontend/public/favicon.png` | **TODO: Verify** | **TODO: Verify** |
| `init.d/02.frontend/escape-room-frontend/src/assets/background.jpg` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/banner.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/cat.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/closedtome.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/noanswers.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/openedtome.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/orb.png` | NightCafé AI | Apache-2.0 |
| `init.d/02.frontend/escape-room-frontend/src/assets/redcircle.png` | NightCafé AI | Apache-2.0 |
| `resources/background.jpg` | NightCafé AI | Apache-2.0 |
| `resources/banner.png` | **TODO: Verify** | **TODO: Verify** |
| `resources/noanswers.png` | NightCafé AI | Apache-2.0 |
| `resources/orb.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo0.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo0_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo1.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo1_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo2.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo2_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo3.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo3_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo4.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo4_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo5.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo5_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo6.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo6_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo7.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo7_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo8.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo8_original.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo9.png` | NightCafé AI | Apache-2.0 |
| `resources/photoframe/photo9_original.png` | NightCafé AI | Apache-2.0 |
| `resources/redcircle.png` | NightCafé AI | Apache-2.0 |
| `resources/wisdom.png` | NightCafé AI | Apache-2.0 |

## SVG images

| File | Source | License / status |
|------|--------|------------------|
| `init.d/02.frontend/escape-room-frontend/src/assets/github-logo.svg` | GitHub | GitHub logo usage terms; all rights reserved |
| `init.d/02.frontend/escape-room-frontend/src/assets/magic-wand-cursor.svg` | Author: Alexander Webmassa<br/>[Original source](https://codepen.io/Webmassa/pen/BavJmgL) | Not specified |
| `init.d/02.frontend/escape-room-frontend/src/assets/qrcode.svg` | K8s Escape Room contributors | Apache-2.0 |

GitHub's Invertocat is a GitHub trademark and is not relicensed under this repository's Apache-2.0 license; see [GitHub's logo guidelines](https://brand.github.com/foundations/logo#legal) for permitted use.

## Vendored third-party files

- [`init.d/01.metrics-server/manifests/components.yaml`](./init.d/01.metrics-server/manifests/components.yaml) is the release manifest of
  [kubernetes-sigs/metrics-server](https://github.com/kubernetes-sigs/metrics-server), licensed under the Apache License 2.0.

## Third-party notices

See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) for MIT license notices for React and Vite, used as frontend dependencies.

## Tools and dependencies

The following are not bundled in this repository. They are downloaded or installed at build or run time and remain under their own licenses:

- Workbench image tools: kubectl, kustomize, helm, kind, docker, buildx, k9s, sofka, yq
- Frontend (React, React Router, Vite and further npm dependencies, see `init.d/02.frontend/escape-room-frontend/package.json`)
- Container images: nginx, python, kindest/node
