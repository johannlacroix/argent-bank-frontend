import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Transactions() {
  const { accountId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  // Exemple statique, plus tard on peut connecter à une API
  return (
    <main className="main bg-dark">
      <div className="account-header">
        <h2>Argent Bank {accountId} Account</h2>
        <div className="account-balance">
          <h3>$48,098.43</h3>
          <p>Available balance</p>
        </div>
      </div>

      <section className="transaction">
        <div className="transaction-row">
          <div className="transaction-main">
            <span>27/02/20</span>
            <span>Golden Sun Bakery</span>
          </div>
          <div className="transaction-sub">
            <span>$8.00</span>
            <span>$298.00</span>
            <button className="expand-btn" onClick={toggleDetails}>
              {isExpanded ? "▴" : "▾"}
            </button>
          </div>
        </div>

        {/* Détail extensible (comme dans l’image) */}
        <div className={`transaction-details ${isExpanded ? "show" : ""}`}>
          <div className="transacttion-row">
            <div className="transaction-main-col">
              <span className="transaction-type">
                <span>Transaction type Electronic</span>
              </span>
              <div className="transaction-sub">
                <span>
                  Category: Food <i className="fa fa-pencil" />
                </span>
              </div>
              <span>
                Note: lorem ipsum <i className="fa fa-pencil" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
