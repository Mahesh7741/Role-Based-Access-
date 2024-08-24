import AddCoures from "./AddCourse";
function HomePage() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            width: "100vw",
            height: "100vh",
            margin: 0, 
            backgroundColor: "#f4f4f4" 
        }}>
            <div><AddCoures></AddCoures></div>
            {/* <h1>Welcome to Home Page</h1> */}
        </div>
    );
}

export default HomePage;
