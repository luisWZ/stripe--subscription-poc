import { SpinnerContainer, SpinnerOverlay } from './Loading.styles';

const Loading = ({ buttonStyles }) => (
  <SpinnerOverlay buttonStyles={buttonStyles}>
    <SpinnerContainer buttonStyles={buttonStyles} />
  </SpinnerOverlay>
);

export default Loading;
