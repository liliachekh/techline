import PropTypes from 'prop-types';

export function IconTableList({ height, width, fill }) {
  return (
    <svg width={width} height={height} fill={fill}viewBox="0 0 1024 1024">
      <path d="M832 256 192 256C153.6 256 128 230.4 128 192l0 0c0-38.4 25.6-64 64-64l640 0c38.4 0 64 25.6 64 64l0 0C896 230.4 870.4 256 832 256z" />
    <path d="M832 576 192 576C153.6 576 128 550.4 128 512l0 0c0-38.4 25.6-64 64-64l640 0c38.4 0 64 25.6 64 64l0 0C896 550.4 870.4 576 832 576z" />
    <path d="M832 896 192 896c-38.4 0-64-25.6-64-64l0 0c0-38.4 25.6-64 64-64l640 0c38.4 0 64 25.6 64 64l0 0C896 870.4 870.4 896 832 896z" />
    </svg>
  );
}

IconTableList.defaultProps = {
  height: 150,
  width: 150,
  fill: '#f7fbfa'
};

IconTableList.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
};