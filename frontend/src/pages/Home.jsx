import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-4 py-8 px-10">
        <div className="w-full flex justify-end">
          <Link
            to="/create"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Task
          </Link>
        </div>
        <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2  gap-6">
          <TaskCard
            title={`Title`}
            description={`  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            totam inventore ut iure possimus, quam distinctio sint corrupti vel
            corporis alias recusandae odio? Quam harum doloribus laborum
            architecto dolores quibusdam?`}
          />
          <TaskCard
            title={`Title`}
            description={`  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            totam inventore ut iure possimus, quam distinctio sint corrupti vel
            corporis alias recusandae odio? Quam harum doloribus laborum
            architecto dolores quibusdam?`}
          />
          <TaskCard
            title={`Title`}
            description={`  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            totam inventore ut iure possimus, quam distinctio sint corrupti vel
            corporis alias recusandae odio? Quam harum doloribus laborum
            architecto dolores quibusdam?`}
          />
          <TaskCard
            title={`Title`}
            description={`  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            totam inventore ut iure possimus, quam distinctio sint corrupti vel
            corporis alias recusandae odio? Quam harum doloribus laborum
            architecto dolores quibusdam?`}
          />
        </div>
      </div>
    </div>
  );
}
