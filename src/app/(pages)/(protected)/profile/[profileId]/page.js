import Profile from "@/containers/protected/Profile";

const ViewProfile = ({ params }) => {
	const { profileId } = params;
	return <Profile profileId={profileId} />;
};

export default ViewProfile;
