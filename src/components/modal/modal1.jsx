import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { useForm } from "react-hook-form";
import { postReq } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

export default function ModalUnstyled({ handleClose, open }) {
  const navigate = useNavigate();
  // for loader state 
  const [loader, setloader] = useState(false);
  // form 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setloader(true);
    console.log("Form Data:", data);
    const response = await postReq("/proceed/add", data);
    console.log(response?.status, "modal");
    if (response?.status == 201) {
      handleClose();
      reset();
      navigate("/passchange");
    } else {
      setloader(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 300 }}>
          {loader ? (
// for loader 
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="blue"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="loader-div2"
            />
          ) : (
            <>
              <h2 className="modal-title">User Details</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                  error={errors.name}
                />
                {errors.name && <ErrorMessage>Name is required</ErrorMessage>}

                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  error={errors.email}
                />
                {errors.email && <ErrorMessage>Email is required</ErrorMessage>}

                <Input
                  type="text"
                  placeholder="CNIC (e.g., 12345-6789012-3)"
                  {...register("cnic", { required: true })}
                  error={errors.cnic}
                />
                {errors.cnic && <ErrorMessage>CNIC is required</ErrorMessage>}

                <SubmitButton type="submit">Submit</SubmitButton>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  500: "#007FFF",
};

const red = {
  500: "#ff4d4d",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};

    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
    width: 320px;
  `
);

const Input = styled("input")`
  width: 100%;
  margin-left: 05px;

  transition: 0.3s;
  &:focus {
    border-color: ${(props) => (props.error ? red[500] : blue[500])};
    box-shadow: 0 0 5px ${(props) => (props.error ? red[500] : blue[500])};
  }
`;

const SubmitButton = styled("button")`
  width: 100%;
  padding: 10px;
  background: ${blue[500]};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #005bbb;
  }
`;

const ErrorMessage = styled("p")`
  color: ${red[500]};
  font-size: 14px;
  margin: 0;
  padding: 4px 0;
`;

export { ModalUnstyled };
