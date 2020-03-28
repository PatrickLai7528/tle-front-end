import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { repositories } from "../../stubs/repository";

export interface IFileReaderProps {
  repo: any;
}

const FileReader: FunctionComponent<IFileReaderProps> = memo(
  (props: IFileReaderProps) => {
    const repo = repositories[0];
    const [commits, setCommits] = useState<any[]>([]);
    const [trees, setTrees] = useState<any[]>([]);

    const activeCommit = commits[0];
    useEffect(() => {
      let ignore = false;

      async function fetchData() {
        const res = await fetch(repo.commits_url.replace("{/sha}", ""));
        if (!ignore) {
          res.json().then(res => setCommits(res));
        }
      }

      fetchData();
      return () => {
        ignore = true;
      };
    }, []);

    useEffect(() => {
      let ignore = false;

      async function fetchData() {
        const res = await fetch(activeCommit.commit.tree.url);
        if (!ignore) {
          res.json().then(res => setTrees(res));
        }
      }
      if (activeCommit) {
        fetchData();
      }
      return () => {
        ignore = true;
      };
    }, [activeCommit]);

    return (
      <>
        {commits.map((commit: any) => {
          return (
            <>
              <a href={commit.commit.tree.url}>{commit.commit.tree.url}</a>
              <br />
            </>
          );
        })}
      </>
    );
  }
);

export default FileReader;
