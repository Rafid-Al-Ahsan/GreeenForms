import AnimationSection from "./AnimationSection";
import Banner from "./Banner";
import CallToAction from "./CallToAction";
import Header from "./Header";

const Dashboard = () => {
    return (
        <div>
            <Banner></Banner>
            <Header></Header>
            <AnimationSection></AnimationSection>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Dashboard;