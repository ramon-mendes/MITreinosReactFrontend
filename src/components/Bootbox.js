import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import PropTypes from "prop-types";
import bootbox from "bootbox/dist/bootbox.min.js";

const Bootbox = (props) => {
  const balert = () => {
      bootbox.alert({
        message: props.message,
        callback: function () {
          props.onClose();
        },
      });
    },
    bconfirm = () => {
      bootbox.confirm({
        buttons: {
          cancel: {
            className: props.cancelClassNames,
            label: props.cancelLabel,
          },
          confirm: {
            className: props.successClassNames,
            label: props.successLabel,
          },
        },
        callback: (result) => {
          if (result) {
            props.onSuccess();
          } else {
            props.onCancel();
          }
        },
        message: props.message,
      });
    },
    bprompt = () => {
      bootbox.prompt({
        title: props.message,
        callback: (result) => {
          props.onPrompt(result);
        }
      })
    }

  if (props.show) {
    switch (props.type) {
      case "alert":
        balert();
        break;
      case "confirm":
        bconfirm();
        break;
      case "prompt":
        bprompt();
        break;
      default:
        balert();
        break;
    }
  }
  return null;
};

Bootbox.defaultProps = {
  cancelClassNames: "btn-danger",
  cancelLabel: "No",
  message: "",
  show: false,
  successClassNames: "btn-primary",
  successLabel: "Yes",
};

Bootbox.propTypes = {
  cancelClassNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  cancelLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(null)]),
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(null)]),
  onSuccess: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(null)]),
  onPrompt: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(null)]),
  show: PropTypes.bool.isRequired,
  successClassNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  successLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
};

export default Bootbox;
