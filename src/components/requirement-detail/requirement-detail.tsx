import { EditOutlined } from "@ant-design/icons";
import { Input, Skeleton, Typography } from "antd";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useState
} from "react";
import { createUseStyles } from "react-jss";
import ReactMarkdown from "react-markdown";
import { IRequirementDescription, ITraceLink } from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface IStateProps {
  traceLinks: ITraceLink[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchRequirementRelatedTraceLinks: (
    repoName: string,
    requirementId: string
  ) => void;
}

export interface IOwnProps {
  description: IRequirementDescription;
  repoName: string;
  onDescriptionUpdate: (id: string, descriptionText: string) => void;
}

export interface IRequirementDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  requirementDetail: {
    width: "100%"
  },
  relatedImplements: {
    margin: { top: "16px" },
    display: "flex",
    flexDirection: "column"
  },
  implementCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  editableArea: {
    marginBottom: "16px"
  }
});

const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo(
  (props: IRequirementDetailProps) => {
    const {
      repoName,
      description,
      onDescriptionUpdate,
      fetchRequirementRelatedTraceLinks,
      loading,
      traceLinks
    } = props;
    const styles = useStyles();
    const [editable, setEditable] = useState<boolean>(false);
    const { text, id } = description;
    const [textAreaValue, setTextAreaValue] = useState<string>(text);

    useEffect(() => {
      const doFetch = async () => {
        try {
          await fetchRequirementRelatedTraceLinks(repoName, description.id);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };

      doFetch();
    }, [repoName, fetchRequirementRelatedTraceLinks, description]);

    const traceLinksContent = useMemo(() => {
      if (loading) {
        return (
          <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />
        );
      } else if (!loading && traceLinks) {
        return traceLinks.map(link => (
          <SimpleTraceLinkCard
            key={link.id}
            traceLink={link}
            showRequirement={false}
          />
        ));
      }
    }, [traceLinks, loading]);

    return (
      <div className={styles.requirementDetail}>
        <Typography.Title level={3}>
          需求描述 <EditOutlined onClick={() => setEditable(true)} />
        </Typography.Title>
        {editable ? (
          <Input.TextArea
            autoFocus
            className={styles.editableArea}
            autoSize
            onBlur={() => {
              setEditable(false);
              onDescriptionUpdate(id, textAreaValue);
            }}
            value={textAreaValue}
            onChange={e => setTextAreaValue(e.target.value)}
          />
        ) : (
          <ReactMarkdown source={textAreaValue} />
        )}
        <Typography.Title level={3}>追踪線索</Typography.Title>
        {traceLinksContent}
      </div>
    );
  }
);

export default RequirementDetail;
