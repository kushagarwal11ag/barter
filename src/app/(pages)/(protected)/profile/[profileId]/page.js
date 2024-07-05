import Profile from "@/containers/protected/Profile";

const ProfilePage = ({ params }) => {
	const { profileId } = params;
	return <Profile profileId={profileId} />;
};

export default ProfilePage;
