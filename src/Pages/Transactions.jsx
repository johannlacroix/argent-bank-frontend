import { useParams } from "react-router-dom";

export default function Transactions() {
  const { accountId } = useParams();

  // Exemple statique, plus tard on peut connecter à une API
  return (
    <main className="main bg-dark">
      <div className="account-header">
        <h2>Argent Bank {accountId} Account</h2>
        <p>$48,098.43</p>
        <p>Available balance</p>
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
            <button className="expand-btn">▾</button>
          </div>
        </div>

        {/* Détail extensible (comme dans l’image) */}
        <div className="transaction-details">
          <p>Transaction type: Electronic</p>
          <p>
            Category: Food <i className="fa fa-pencil" />
          </p>
          <p>
            Note: lorem ipsum <i className="fa fa-pencil" />
          </p>
        </div>
      </section>
    </main>
  );
}
