import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const TimeAgoWrapper = ({ date, ...props }) => {
	return <ReactTimeAgo date={date} locale="en-US" timeStyle="round-minute" {...props} />;
};

export default TimeAgoWrapper;
