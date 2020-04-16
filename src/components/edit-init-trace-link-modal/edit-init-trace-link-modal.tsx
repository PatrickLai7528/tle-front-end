import React, { FunctionComponent, memo, useState, useEffect } from "react";
import { ITraceLinkMatrix, IImplement, ITraceLink } from "../../types";
import { Modal, Empty } from "antd";
import { TraceLinkCard } from "../trace-link-card";
import { v4 as uuidv4 } from "uuid";
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

    const handleDeleteImplement = (link: ITraceLink, impl: IImplement) => {
      if (traceLinkMatrix) {
        const linkIndex = traceLinkMatrix.links.indexOf(link);
        const implIndex = link.implements.indexOf(impl);
        const oldImpls = link.implements;
        oldImpls.splice(implIndex, 1);
        const newLink = {
          ...link,
          implements: [...oldImpls]
        };
        traceLinkMatrix.links[linkIndex] = { ...newLink };
        setTraceLinkMatrix({ ...traceLinkMatrix });
      }
    };

    const handleAddImplement = (link: ITraceLink, implFilename: string) => {
      if (traceLinkMatrix) {
        const impl: IImplement = {
          fullyQualifiedName: implFilename,
          id: uuidv4(),
          type: "CLASS",
          traced: true
        };
        const newLinks: ITraceLink[] = traceLinkMatrix.links.map(oldLink => {
          return oldLink.id === link.id
            ? {
                ...link,
                implements: [impl, ...link.implements]
              }
            : oldLink;
        });

        setTraceLinkMatrix({
          ...traceLinkMatrix,
          links: [...newLinks]
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
        {!!traceLinkMatrix && traceLinkMatrix.links.length !== 0 ? (
          traceLinkMatrix.links.map(traceLink => (
            <TraceLinkCard
              editable={true}
              key={traceLink.id}
              traceLink={traceLink}
              onDeleteImplement={handleDeleteImplement}
              onAddImplement={handleAddImplement}
            />
          ))
        ) : (
          <Empty />
        )}
      </Modal>
    );
  }
);

export default EditInitTraceLinkModal;
