
import { Question } from '@/types/quiz';

export const kubernetesQuestions: Question[] = [
  {
    question: "What is Kubernetes?",
    options: [
      "A container runtime",
      "A container orchestration platform",
      "A programming language",
      "A database system"
    ],
    correct: 1,
    explanation: "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications."
  },
  {
    question: "What is a Pod in Kubernetes?",
    options: [
      "A group of containers that share storage and network",
      "A single container",
      "A Kubernetes cluster",
      "A deployment strategy"
    ],
    correct: 0,
    explanation: "A Pod is the smallest deployable unit in Kubernetes, consisting of one or more containers that share storage and network."
  },
  {
    question: "What is the primary function of kubelet?",
    options: [
      "To manage the cluster state",
      "To run on each node and manage containers",
      "To provide the API server",
      "To schedule pods"
    ],
    correct: 1,
    explanation: "Kubelet is the primary node agent that runs on each node and manages containers, ensuring they are running in a Pod."
  },
  {
    question: "What is a Service in Kubernetes?",
    options: [
      "A way to expose applications running on a set of Pods",
      "A type of container",
      "A storage mechanism",
      "A security policy"
    ],
    correct: 0,
    explanation: "A Service is an abstraction that defines a logical set of Pods and enables external traffic exposure, load balancing, and service discovery."
  },
  {
    question: "What is the difference between a Deployment and a ReplicaSet?",
    options: [
      "No difference, they are the same",
      "Deployment manages ReplicaSets and provides declarative updates",
      "ReplicaSet manages Deployments",
      "Deployment is older than ReplicaSet"
    ],
    correct: 1,
    explanation: "A Deployment manages ReplicaSets and provides declarative updates to Pods along with rollback capabilities."
  },
  {
    question: "What is kubectl?",
    options: [
      "A Kubernetes cluster",
      "A command-line interface for Kubernetes",
      "A container runtime",
      "A monitoring tool"
    ],
    correct: 1,
    explanation: "kubectl is the command-line interface for interacting with Kubernetes clusters."
  },
  {
    question: "What is a Namespace in Kubernetes?",
    options: [
      "A way to physically separate clusters",
      "A way to logically separate resources within a cluster",
      "A type of container",
      "A networking concept"
    ],
    correct: 1,
    explanation: "Namespaces provide a way to logically separate resources within a single Kubernetes cluster."
  },
  {
    question: "What is the purpose of etcd in Kubernetes?",
    options: [
      "To run containers",
      "To store cluster configuration and state",
      "To manage networking",
      "To schedule pods"
    ],
    correct: 1,
    explanation: "etcd is a distributed key-value store that stores all cluster configuration and state information."
  },
  {
    question: "What is a ConfigMap used for?",
    options: [
      "To store secrets",
      "To store configuration data in key-value pairs",
      "To manage containers",
      "To define network policies"
    ],
    correct: 1,
    explanation: "ConfigMap is used to store configuration data in key-value pairs that can be consumed by Pods."
  },
  {
    question: "What is the difference between a Secret and a ConfigMap?",
    options: [
      "No difference",
      "Secret stores sensitive data, ConfigMap stores non-sensitive configuration",
      "ConfigMap stores sensitive data, Secret stores non-sensitive data",
      "Secret is encrypted, ConfigMap is not"
    ],
    correct: 1,
    explanation: "Secrets are intended to hold sensitive information like passwords and tokens, while ConfigMaps hold non-sensitive configuration data."
  },
  {
    question: "What is an Ingress in Kubernetes?",
    options: [
      "A way to manage cluster resources",
      "An API object that manages external access to services",
      "A type of Pod",
      "A storage class"
    ],
    correct: 1,
    explanation: "Ingress is an API object that manages external access to services in a cluster, typically HTTP/HTTPS."
  },
  {
    question: "What is a DaemonSet?",
    options: [
      "A type of service",
      "Ensures that a copy of a Pod runs on each node",
      "A configuration management tool",
      "A type of storage"
    ],
    correct: 1,
    explanation: "DaemonSet ensures that all (or some) nodes run a copy of a Pod, typically used for system-level services."
  },
  {
    question: "What is the Kubernetes scheduler responsible for?",
    options: [
      "Managing container images",
      "Assigning Pods to nodes",
      "Handling network traffic",
      "Storing cluster state"
    ],
    correct: 1,
    explanation: "The Kubernetes scheduler is responsible for assigning Pods to nodes based on resource requirements and constraints."
  },
  {
    question: "What is a StatefulSet?",
    options: [
      "A way to manage stateless applications",
      "A way to manage stateful applications with persistent storage",
      "A type of service",
      "A networking component"
    ],
    correct: 1,
    explanation: "StatefulSet manages stateful applications, providing stable network identities and persistent storage."
  },
  {
    question: "What is the purpose of a Persistent Volume (PV)?",
    options: [
      "To provide temporary storage",
      "To provide persistent storage that exists beyond Pod lifecycle",
      "To manage container images",
      "To handle network traffic"
    ],
    correct: 1,
    explanation: "Persistent Volume provides persistent storage that exists independently of Pod lifecycle."
  },
  {
    question: "What is a Persistent Volume Claim (PVC)?",
    options: [
      "A request for storage by a user/Pod",
      "A type of Persistent Volume",
      "A storage driver",
      "A backup mechanism"
    ],
    correct: 0,
    explanation: "PVC is a request for storage by a user or Pod, similar to how Pods consume node resources."
  },
  {
    question: "What is the role of kube-proxy?",
    options: [
      "To manage Pod scheduling",
      "To handle network routing and load balancing for Services",
      "To store cluster state",
      "To manage container images"
    ],
    correct: 1,
    explanation: "kube-proxy handles network routing and load balancing for Services on each node."
  },
  {
    question: "What is a Horizontal Pod Autoscaler (HPA)?",
    options: [
      "A tool to scale nodes",
      "A tool to automatically scale Pods based on CPU utilization or other metrics",
      "A scheduling mechanism",
      "A storage solution"
    ],
    correct: 1,
    explanation: "HPA automatically scales the number of Pods based on observed CPU utilization or other custom metrics."
  },
  {
    question: "What is the difference between a NodePort and LoadBalancer service?",
    options: [
      "No difference",
      "NodePort exposes service on each node's IP, LoadBalancer provides external load balancer",
      "LoadBalancer is internal, NodePort is external",
      "NodePort is deprecated"
    ],
    correct: 1,
    explanation: "NodePort exposes the service on each node's IP at a static port, while LoadBalancer provides an external load balancer."
  },
  {
    question: "What is a Job in Kubernetes?",
    options: [
      "A type of service",
      "A way to run Pods to completion for batch processing",
      "A scheduling mechanism",
      "A storage type"
    ],
    correct: 1,
    explanation: "A Job creates one or more Pods and ensures that a specified number of them successfully terminate."
  }
];

// Add more questions to reach 100 total
const additionalKubernetesQuestions: Question[] = [
  {
    question: "What is a CronJob in Kubernetes?",
    options: [
      "A scheduled Job that runs on a time-based schedule",
      "A type of service",
      "A monitoring tool",
      "A networking component"
    ],
    correct: 0,
    explanation: "CronJob creates Jobs on a repeating schedule, similar to cron in Unix-like systems."
  },
  {
    question: "What is the purpose of resource quotas in Kubernetes?",
    options: [
      "To limit resource consumption in a namespace",
      "To increase performance",
      "To manage networking",
      "To handle storage"
    ],
    correct: 0,
    explanation: "Resource quotas provide constraints that limit aggregate resource consumption per namespace."
  },
  {
    question: "What is a Helm chart?",
    options: [
      "A monitoring dashboard",
      "A package manager for Kubernetes applications",
      "A networking tool",
      "A storage solution"
    ],
    correct: 1,
    explanation: "Helm is a package manager for Kubernetes that uses charts to define, install, and upgrade applications."
  },
  {
    question: "What is the difference between a Deployment and a StatefulSet?",
    options: [
      "Deployment is for stateless apps, StatefulSet is for stateful apps",
      "No difference",
      "StatefulSet is deprecated",
      "Deployment is newer"
    ],
    correct: 0,
    explanation: "Deployments are ideal for stateless applications, while StatefulSets are designed for stateful applications requiring stable identities."
  },
  {
    question: "What is a NetworkPolicy in Kubernetes?",
    options: [
      "A way to control traffic flow between Pods",
      "A type of service",
      "A storage mechanism",
      "A scheduling policy"
    ],
    correct: 0,
    explanation: "NetworkPolicy defines how groups of Pods are allowed to communicate with each other and other network endpoints."
  }
];

export const allKubernetesQuestions = [...kubernetesQuestions, ...additionalKubernetesQuestions];
