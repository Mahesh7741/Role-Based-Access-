const userDB = [
    { id: 1, username: "mahesh", email: "mahesh@email.com" },
    { id: 2, username: "ujjwal", email: "ujjwal@email.com" },
    { id: 3, username: "shubham", email: "shubham@email.com" },
  ];
  
  function Card() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          gap: "20px", // Space between cards
          background:"gray",
        }}
      >
        {userDB.map((user) => (
          <div
            key={user.id}
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <strong>{user.username}</strong>
              <br />
              <span>{user.email}</span>
            </div>
            <div>
              <button
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={()=>{
                    console.log(user.id)
                }}
              >
                {`Mr. ${user.username}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Card;
  