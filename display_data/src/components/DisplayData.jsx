import React, { useState, useEffect } from "react";
import axios from "axios";
import "./displaydata.css"; // Import the CSS file

const DisplayData = () => {
  const [quotes, setQuotes] = useState([]);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    const quotesArray = [];
    for (let i = 0; i < 10; i++) {
      try {
        const response = await axios.get(
          "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
        );
        const newQuote = {
          id: i + 1,
          text: response.data[0],
        };
        quotesArray.push(newQuote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    }
    setQuotes(quotesArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const saveQuote = (quote) => {
    if (!savedQuotes.find((q) => q.id === quote.id)) {
      setSavedQuotes([...savedQuotes, quote]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  const removeQuote = (quoteId) => {
    setSavedQuotes(savedQuotes.filter((q) => q.id !== quoteId));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Ron Swanson Quotes</h1>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Quote added to the saved list successfully!{" "}
          <a href="#table" className="alert-link">
            see added quote
          </a>
          . Give it a click if you like.
        </div>
      )}
      <button className="btn btn-secondary mb-3" onClick={fetchQuotes}>
        Fetch New Quotes
      </button>
      <div className="row">
        {quotes.map((quote) => (
          <div className="col-sm-4" key={quote.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quote {quote.id}</h5>
                <p className="card-text">{quote.text}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => saveQuote(quote)}
                >
                  Save to List
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {savedQuotes.length > 0 && (
        <div>
          <h2>Saved Quotes</h2>
          <table className="table" id="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quote</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedQuotes.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{quote.text}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeQuote(quote.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayData;
