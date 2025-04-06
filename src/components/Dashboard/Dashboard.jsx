
import Header from "../Header";
import Footer from "../Footer";
import List from "../List";

const Dashboard = () => {
  return (
    <div className="app-page">
      <Header />
      <main className="app-content">
        <List />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
