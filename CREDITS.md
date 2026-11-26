# Credits

This project is licensed under the [Apache License 2.0](./LICENSE).
This file lists third-party material and acknowledgements.

## Inspiration

- [The Great Escape](https://github.com/t-gmn/the-great-escape) by t-gmn

## Images

All pictures were AI-generated with [NightCafé](https://creator.nightcafe.studio/) and are provided as-is.
According to the [NightCafé terms](https://nightcafe.studio/policies/terms-of-service), the rights in generated artworks belong to the creator and may be used commercially.
NightCafé gives no warranty that copyright can be claimed in AI-generated artwork or that it does not infringe third-party rights, and neither do we.

## Vendored third-party files

- [`init.d/01.metrics-server/manifests/components.yaml`](./init.d/01.metrics-server/manifests/components.yaml) is the release manifest of
  [kubernetes-sigs/metrics-server](https://github.com/kubernetes-sigs/metrics-server), licensed under the Apache License 2.0.

## Trademarks

- GitHub® and the Invertocat logo are trademarks of GitHub, Inc. The logo is only used to point to this repository and does not imply any affiliation with or endorsement by GitHub.
  See the [GitHub logo guidelines](https://github.com/logos).

## Tools and dependencies

The following are not bundled in this repository. They are downloaded or installed at build or run time and remain under their own licenses:

- Workbench image tools: kubectl, kustomize, helm, kind, docker, buildx, k9s, sofka, yq
- Frontend (React, React Router, Vite and further npm dependencies, see `init.d/02.frontend/escape-room-frontend/package.json`)
- Container images: nginx, python, kindest/node
