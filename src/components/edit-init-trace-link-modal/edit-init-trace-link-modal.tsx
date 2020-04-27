import { Empty, Modal } from "antd";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useState
} from "react";
import { ITraceLink, ITraceLinkMatrix } from "../../types";
import { classifyTraceLinksByRequirement } from "../../utils/trace-links";
import TraceLinkCard from "../trace-link/trace-link-card";
export interface IStateProps {
  visible: boolean;
}

export interface IDispatchProps {
  close: () => void;
  confirmInitTraceLink: (matrix: ITraceLinkMatrix) => void;
}

export interface IOwnProps {
  traceLinkMatrix?: ITraceLinkMatrix;
  width: string | number;
}

export interface IEditInitTraceLinkModalProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const EditInitTraceLinkModal: FunctionComponent<IEditInitTraceLinkModalProps> = memo(
  (props: IEditInitTraceLinkModalProps) => {
    const { visible, close, width, confirmInitTraceLink } = props;
    const [traceLinkMatrix, setTraceLinkMatrix] = useState(
      props.traceLinkMatrix
    );

    useEffect(() => setTraceLinkMatrix(props.traceLinkMatrix), [props]);

    console.log(traceLinkMatrix);

    const requirementLinkMap = useMemo(
      () => classifyTraceLinksByRequirement(traceLinkMatrix?.links || []),
      [traceLinkMatrix]
    );

    const handleDeleteLink = (link: ITraceLink) => {
      if (traceLinkMatrix) {
        const oldLinks = traceLinkMatrix.links;
        const newLinks = [];
        for (const oldLink of oldLinks) {
          if (oldLink._id !== link._id) {
            newLinks.push({ ...oldLink });
          }
        }
        setTraceLinkMatrix({
          ...traceLinkMatrix,
          links: [...newLinks]
        });
      }
    };

    const handleAddLink = (link: ITraceLink) => {
      if (traceLinkMatrix) {
        setTraceLinkMatrix({
          ...traceLinkMatrix,
          links: [link, ...traceLinkMatrix.links]
        });
      }
    };

    return (
      <Modal
        title={`追踪線索初始化`}
        width={width}
        onCancel={close}
        visible={visible}
        onOk={() => {
          confirmInitTraceLink({
            ...(traceLinkMatrix as ITraceLinkMatrix)
          });
          close();
        }}
        closable={false}
      >
        {!!traceLinkMatrix && requirementLinkMap ? (
          Object.keys(requirementLinkMap || {})
            .sort()
            .map(requirementId => {
              const traceLinks: ITraceLink[] =
                requirementLinkMap[requirementId];
              return (
                <TraceLinkCard
                  key={requirementId}
                  editable={true}
                  onAddLink={handleAddLink}
                  onDeleteLink={handleDeleteLink}
                  tracelinks={traceLinks}
                  requirement={traceLinks[0].requirementDescription}
                />
              );
            })
        ) : (
          <Empty />
        )}
      </Modal>
    );
  }
);

export default EditInitTraceLinkModal;
