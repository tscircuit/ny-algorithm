import MeshGrid from "../lib/components/MeshGrid";
import {convertObjectiveSolutionsToPaths} from "../lib/convertObjectiveSolutionsToPaths";
import {getClosestNode} from "../lib/getClosestNode";
import type {GraphData, Problem} from "../lib/solver-types";
import {solveMultiObjective} from "../lib/solvers/solver1";
import solver1GraphRaw from "./solver1-graph.json";

const solver1Graph = solver1GraphRaw as unknown as GraphData

const problem: Problem = {
  objectives: [
    {
      start: getClosestNode(solver1Graph, { x: 0, y: 200}),
      end: getClosestNode(solver1Graph, { x: 600, y: 200 })
    }
  ]
};
const { objectiveSolutions, attemptedPaths } = solveMultiObjective(problem, solver1Graph);

export default () => {
  return <MeshGrid graphData={
    {
      ...solver1Graph,
      objectives: problem.objectives.map(o => ({ 
        start: o.start.id,
        end: o.end.id
      })),
      paths: convertObjectiveSolutionsToPaths(solver1Graph, objectiveSolutions),
    } as any
  }
    attemptedPaths={attemptedPaths}
  />;
};
