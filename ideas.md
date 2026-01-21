# Done
Replicas Set to 0: A deployment has 0 replicas, preventing the necessary pod from running.
CrashLoopBackOff: A container keeps crashing due to an application-level error.

# No
Image Typo: The container image for a pod is either misspelled or points to a non-existent image.
Environment Variable Typo: A necessary environment variable is missing or has an incorrect value, causing the application to crash.
ConfigMap Not Mounted: A pod relying on a ConfigMap does not have it correctly mounted, leading to failures.
Service Port Mismatch: A service exposes a port that doesn't match the port exposed by the pods.
NodePort Service Not Listening: A NodePort service is missing its node port mapping or has an invalid range.
External Name/Headless Service Issue: An externalName service points to a non-existent hostname or wrong DNS entry.
LoadBalancer Service Pending: A LoadBalancer service is stuck in Pending state because an external cloud provider is not configured.
ReadOnly PV: A pod tries to write to a volume that is mounted as read-only.
Storage Class Not Found: A PVC references a non-existent or misnamed storage class.
Volume Mount Missing Path: A volume mount is specified but doesn't have a valid mount path in the container.
ConfigMap Key Missing: A pod attempts to read a specific key from a ConfigMap that doesn't exist.
Environment Variables Refer to Missing Configs: Environment variables in a container reference non-existent ConfigMap or Secret keys.
HPA Misconfigured: The HPA is configured with metrics that are not available or reachable.
Job Backoff Limit Exceeded: A job exceeds its backoffLimit due to repeated failures and does not retry.
Node Tainted Without Tolerations: Nodes are tainted, and pods do not have tolerations defined to schedule on them.
Unsatisfiable Node Selector: A pod specifies incorrect nodeSelector labels that no node satisfies.
Insufficient Node Resources: The nodes lack sufficient CPU or memory to run the workload.
Evicted Pods: Pods are evicted due to low node disk space or resource contention.
Kube-System Namespace Issue: A critical application (e.g., CoreDNS) in the kube-system namespace is not running.
Metrics Server Missing: HPA is non-functional because the metrics server is not installed.
kubectl Context Misconfigured: The current-context in a kubeconfig file references the wrong cluster or namespace.
API Version Deprecated: Resources are defined using deprecated or removed API versions.
Readiness and Startup Sequence: A dependent service is not ready while another service tries to access it.
Resource Labels Missing: A service or Ingress references a pod without the necessary label for matching.
Custom Resource Definition (CRD) Absent: Resources are defined for a CRD that has not been installed.
ClusterRole Binding Issues: Cluster-wide permissions are not granted, causing critical workflows to fail.
Horizontal Scaling Disabled: Resources are scheduled too tightly, and higher loads cannot trigger scaling.
ConfigMaps Overwritten: A ConfigMap is modified by another deployment, causing an application to behave unexpectedly.
Mutating or Validating Webhook Rules: A webhook is blocking resource creation or modification.

# Maybe
Pod With Pending State: A pod is in Pending state because node selectors or taints/tolerations mismatches prevent it from being scheduled.
Readiness/Liveness Probes Misconfigured: A liveness or readiness probe is misconfigured, causing the pod to repeatedly restart or fail to become ready.
Secret Missing Permission: A pod cannot access a secret due to missing RBAC (Role-Based Access Control) permissions.
Cluster IP Service Unreachable: A service is not reachable due to a missing or incorrect ClusterIP configuration.
PVC Not Bound to PV: A PVC remains unbound because no suitable PV exists.
HPA Scale Min and Max Same: The HPA's minReplicas and maxReplicas are identical, preventing proper scaling.
Pod Missing ServiceAccount: A pod does not specify a serviceAccountName when one is required.
CronJob Failing in Suspend Mode: A CronJob is set to suspend: true and therefore doesn't create jobs.
Ingress Path Misconfigured: An ingress resource routes traffic to the wrong service or path.
Ingress Controller Missing: No ingress controller is running in the cluster, causing ingress resources to be ignored.
Certificate Secret Missing: An ingress resource references a TLS secret that does not exist.
DNS Not Configured: DNS entries pointing to the ingress controller are missing.
Affinity/Anti-Affinity Rules Conflict: A pod's affinity or anti-affinity rules prevent scheduling.
CoreDNS ConfigMap Error: The CoreDNS configuration in kube-system is invalid, preventing pod DNS resolution.
Namespace Deleted or Misconfigured: A namespace is deleted, but pods or resources still reference it.
Namespace Not Specified: A resource is accidentally created in the wrong namespace or no namespace.
Sidecars Not Communicating: Communication between a main container and its sidecar fails due to incorrect inter-container setup.
Secret Not Created: A pod references a secret that hasn't been created.

# Yes
Image Pull Policy Issue: The imagePullPolicy is set incorrectly (e.g., Never when the image is not present locally).
Resource Limits Not Set: A pod fails to start because it doesn't have enough resources available due to missing or excessive resource requests/limits.
Init Containers Failing: An init container fails to complete successfully, preventing the main containers from starting.
PV Access Mode Mismatch: A PV's access mode does not match the PVC's requirements (e.g., ReadWriteOnce vs. ReadWriteMany).
Insufficient Permissions: A role or role binding does not grant the required permission to a service account.
API Endpoint Access Denied: A user, pod, or script tries to use the Kubernetes API but lacks permission.
