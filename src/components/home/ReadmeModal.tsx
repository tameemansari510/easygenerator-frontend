import { ReadmeModalProps } from "../../types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ReadmeModal = ({
  showModal,
  content,
  handleOnClose,
}: ReadmeModalProps) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 style={{ textAlign: "center", color: "#e45852" }}>Easygenerator</h3>
        <p>{content}</p>
      </Modal.Body>
      <Modal.Footer style={{ flexDirection: "column" }}>
        <Button
          style={{
            width: "25%",
            color: "white",
            backgroundColor: "#c05460",
            borderColor: "#c05460",
          }}
          onClick={handleOnClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
