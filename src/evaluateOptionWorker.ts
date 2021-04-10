import { workerData, parentPort } from "worker_threads";
import { EvaluateOptionParams, evaluateOption } from "./evaluateOption";

if (parentPort) {
  const params: EvaluateOptionParams[] = workerData.params;

  const solutions = params.flatMap(evaluateOption);

  parentPort.postMessage(solutions);
}
