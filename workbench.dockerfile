FROM debian:stable-slim AS base

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
ENV BUILDX_VERSION=v0.23.0
# https://docs.docker.com/engine/release-notes
# renovate: datasource=docker depName=docker.io/docker versioning=docker
ENV DOCKER_VERSION=28.1.1
# https://github.com/derailed/k9s/releases
# renovate: datasource=github-releases depName=derailed/k9s
ENV K9S_VERSION=v0.50.6
# https://github.com/mikefarah/yq/releases
# renovate: datasource=github-releases depName=mikefarah/yq
ENV YQ_VERSION=v4.45.4

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    DEBIAN_FRONTEND=noninteractive apt-get update && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
            apt-transport-https \
            arping \
            bash-completion \
            ca-certificates \
            curl \
            expect \
            gettext-base \
            git \
            gnupg-agent \
            joe \
            jq \
            less \
            locate \
            net-tools \
            openssh-server \
            pkg-config \
            patch \
            software-properties-common \
            sudo \
            unzip \
            vim && \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false

COPY patches/ /patches/

RUN rm -rf /var/lib/apt/lists/* && \
    curl -L "https://github.com/derailed/k9s/releases/download/${K9S_VERSION}/k9s_Linux_amd64.tar.gz" -o k9s.tar.gz && \
    tar -xzf k9s.tar.gz && mv k9s /usr/local/bin && rm k9s.tar.gz && \
    curl -Lo /usr/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod 755 /usr/bin/kubectl && \
    /usr/bin/kubectl completion bash > $(pkg-config --variable=completionsdir bash-completion)/kubectl && \
    echo "alias k=kubectl" >> /etc/bash.bashrc && \
    patch -p1 -d $(pkg-config --variable=completionsdir bash-completion) < /patches/kubectl-completion.diff && \
    curl -Lo /usr/bin/kubeseal https://github.com/bitnami-labs/sealed-secrets/releases/download/${KUBESEAL_VERSION}/kubeseal-linux-amd64 && \
    chmod 755 /usr/bin/kubeseal && \
    curl -Ls https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2F${KUSTOMIZE_VERSION}/kustomize_${KUSTOMIZE_VERSION}_linux_amd64.tar.gz | \
    tar xvz -C /usr/bin/ && \
    curl -Ls https://get.helm.sh/helm-${HELM_VERSION}-linux-amd64.tar.gz | tar xvz -C /usr/bin --strip 1 linux-amd64/helm && \
    /usr/bin/helm completion bash > $(pkg-config --variable=completionsdir bash-completion)/helm && \
    curl -Ls https://github.com/istio/istio/releases/download/${ISTIO_VERSION}/istio-${ISTIO_VERSION}-linux-amd64.tar.gz | \
    tar xvz -C /opt/ && \
    find /opt/istio-${ISTIO_VERSION} -type d -exec chmod 755 {} \; && \
    ln -sfT /opt/istio-${ISTIO_VERSION} /opt/istio && \
    ln -s /opt/istio-${ISTIO_VERSION}/bin/istioctl /usr/local/bin/istioctl && \
    mv /opt/istio-${ISTIO_VERSION}/tools/istioctl.bash $(pkg-config --variable=completionsdir bash-completion)/istioctl && \
    curl -Lo /usr/bin/kind https://github.com/kubernetes-sigs/kind/releases/download/${KIND_VERSION}/kind-$(uname)-amd64 && \
    chmod 755 /usr/bin/kind && /usr/bin/kind completion bash > $(pkg-config --variable=completionsdir bash-completion)/kind && \
    curl -fL --remote-name-all "https://github.com/mikefarah/yq/releases/download/${YQ_VERSION}/yq_$(uname | tr '[:upper:]' '[:lower:]')_amd64" && \
    mv "yq_$(uname | tr '[:upper:]' '[:lower:]')_amd64" "/usr/local/bin/yq" && \
    chmod 755 "/usr/local/bin/yq" && \
    /usr/local/bin/yq shell-completion bash > "$(pkg-config --variable=completionsdir bash-completion)/yq" && \
    ls -lah "/usr/local/bin/" && \
    curl -fLs "https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz" | tar xvz -C /opt && \
    curl -fLo "/usr/local/lib/docker/cli-plugins/docker-buildx" "https://github.com/docker/buildx/releases/download/${BUILDX_VERSION}/buildx-${BUILDX_VERSION}.linux-amd64" --create-dirs && \
    ln -s /opt/docker/docker /usr/bin/docker && \
    chmod -R 755 "/usr/local/lib/docker" && \
    /usr/bin/docker -v && \
    curl -f "https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker" -o "$(pkg-config --variable=completionsdir bash-completion)/docker"

COPY welcomemessage.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/welcomemessage.sh
RUN echo '/usr/local/bin/welcomemessage.sh' >> /etc/bash.bashrc

ENV SEALED_SECRETS_CONTROLLER_NAMESPACE=sealed-secrets \
    BUILDKIT_PROGRESS=plain \
    DOCKER_BUILDKIT=1
