import React, {
  FunctionComponent,
  memo,
  useState,
  useEffect,
  useMemo
} from "react";
import { ITraceLinkMatrix, IImplement, ITraceLink } from "../../types";
import { Modal, Empty } from "antd";
import { TraceLinkCard } from "../trace-link-card";
import { classifyTraceLinksByRequirement } from "../../utils/trace-links";
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

    const requirementLinkMap = useMemo(
      () => classifyTraceLinksByRequirement(traceLinkMatrix?.links || []),
      [traceLinkMatrix]
    );

    const handleDeleteLink = (link: ITraceLink) => {
      console.log(link);
      if (traceLinkMatrix) {
        const oldLinks = traceLinkMatrix.links;
        const newLinks = [];
        for (const oldLink of oldLinks) {
          if (oldLink.id !== link.id) {
            newLinks.push({ ...oldLink });
          }
        }
        console.log(newLinks);
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
