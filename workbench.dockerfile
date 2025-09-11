FROM debian:stable-slim@sha256:8810492a2dd16b7f59239c1e0cc1e56c1a1a5957d11f639776bd6798e795608b AS base

RUN DEBIAN_FRONTEND=noninteractive \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
            bash-completion \
            joe \
            jq \
            less \
            locate \
            net-tools \
            sudo \
            vim \
            yq && \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
    apt-get clean && \
    rm -rf "/var/lib/apt/lists/*"

FROM base AS builder

# https://github.com/istio/istio/releases
ENV ISTIO_VERSION=1.20.3
# https://github.com/kubernetes-sigs/kustomize/releases
ENV KUSTOMIZE_VERSION=v5.3.0
# https://kubernetes.io/releases/
ENV KUBECTL_VERSION=v1.29.1
# https://github.com/helm/helm/releases
ENV HELM_VERSION=v3.14.0
# https://github.com/bitnami-labs/sealed-secrets/releases
ENV KUBESEAL_VERSION=v0.25.0
# https://github.com/kubernetes-sigs/kind/releases
ENV KIND_VERSION=v0.27.0

# https://github.com/docker/buildx/releases
# renovate: datasource=github-releases depName=docker/buildx
ENV BUILDX_VERSION=v0.28.0
# https://docs.docker.com/engine/release-notes
# renovate: datasource=docker depName=docker.io/docker versioning=docker
ENV DOCKER_VERSION=28.4.0
# https://github.com/derailed/k9s/releases
# renovate: datasource=github-releases depName=derailed/k9s
ENV K9S_VERSION=v0.50.9

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY patches/ /patches/

RUN DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends -y \
        ca-certificates \
        curl \
        patch && \
    rm -rf "/var/lib/apt/lists/*" && \
    mkdir -p /tmp/completions /tmp/bin && \
    curl -L "https://github.com/derailed/k9s/releases/download/${K9S_VERSION}/k9s_Linux_amd64.tar.gz" -o k9s.tar.gz && \
    tar -xzf k9s.tar.gz && mv k9s /tmp/bin && \
    curl -Lo /tmp/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod 755 /tmp/bin/kubectl && \
    /tmp/bin/kubectl completion bash > /tmp/completions/kubectl && \
    patch -p1 -d /tmp/completions < /patches/kubectl-completion.diff && \
    curl -Lo /tmp/bin/kubeseal https://github.com/bitnami-labs/sealed-secrets/releases/download/${KUBESEAL_VERSION}/kubeseal-linux-amd64 && \
    chmod 755 /tmp/bin/kubeseal && \
    curl -Ls https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2F${KUSTOMIZE_VERSION}/kustomize_${KUSTOMIZE_VERSION}_linux_amd64.tar.gz | \
    tar xvz -C /tmp/bin/ && \
    curl -Ls https://get.helm.sh/helm-${HELM_VERSION}-linux-amd64.tar.gz | tar xvz -C /tmp/bin --strip 1 linux-amd64/helm && \
    /tmp/bin/helm completion bash > /tmp/completions/helm && \
    curl -Ls https://github.com/istio/istio/releases/download/${ISTIO_VERSION}/istio-${ISTIO_VERSION}-linux-amd64.tar.gz | \
    tar xvz -C /opt/ && \
    mv /opt/istio-${ISTIO_VERSION} /opt/istio && \
    find /opt/istio -type d -exec chmod 755 {} \; && \
    cp /opt/istio/tools/istioctl.bash /tmp/completions/istioctl && \
    curl -Lo /tmp/bin/kind https://github.com/kubernetes-sigs/kind/releases/download/${KIND_VERSION}/kind-$(uname)-amd64 && \
    chmod 755 /tmp/bin/kind && /tmp/bin/kind completion bash > /tmp/completions/kind && \
    curl -fLs "https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz" | tar xvz -C /opt && \
    curl -fLo "/usr/local/lib/docker/cli-plugins/docker-buildx" "https://github.com/docker/buildx/releases/download/${BUILDX_VERSION}/buildx-${BUILDX_VERSION}.linux-amd64" --create-dirs && \
    chmod -R 755 "/usr/local/lib/docker" && \
    curl -f "https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker" -o /tmp/completions/docker

FROM base

COPY --from=builder /tmp/bin/* /usr/bin/
COPY --from=builder /tmp/completions/* /usr/share/bash-completion/completions/
COPY --from=builder /usr/local/lib/docker /usr/local/lib/docker
COPY --from=builder /opt/istio /opt/istio
COPY --from=builder /opt/docker /opt/docker

COPY welcomemessage.sh /usr/local/bin/

RUN ln -s /opt/istio/bin/istioctl /usr/bin/istioctl && \
    ln -s /opt/docker/docker /usr/bin/docker && \
    echo "alias k=kubectl" >> /etc/bash.bashrc && \
    chmod +x /usr/local/bin/welcomemessage.sh && \
    echo '/usr/local/bin/welcomemessage.sh' >> /etc/bash.bashrc && \
    ls -lah "/usr/bin/" && \
    /usr/bin/docker -v

ENV SEALED_SECRETS_CONTROLLER_NAMESPACE=sealed-secrets \
    BUILDKIT_PROGRESS=plain \
    DOCKER_BUILDKIT=1
