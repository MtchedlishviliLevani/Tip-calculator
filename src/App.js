import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div
      style={{
        background: " #C5E4E7",
        height: "100vh",
        width: "100%",
        position: "relative",
        padding: "40px 0 0 0",
      }}
    >
      <Title />
      <Box />
    </div>
  );
}

function Title() {
  return (
    <h1
      style={{
        textAlign: "center",
        color: "#3D6666",
        fontSize: "25px",
        letterSpacing: "10px",
      }}
    >
      <span style={{ display: "block" }}>SPLI</span> <span>TTER</span>
    </h1>
  );
}

function Box() {
  const [bill, setBill] = useState(142.55);
  const [btnValue, setBtnValue] = useState(15);
  const [peopleAmount, setPeopleAmount] = useState("5");
  const [percentInp, setPercerntInp] = useState("");

  // let summary = bill * amount;
  let totalsum = (bill + bill * (btnValue || percentInp) * 0.01) / peopleAmount;

  let tipAmount = (bill * (btnValue || percentInp) * 0.01) / peopleAmount;
  let roundedTotalSum = totalsum.toFixed(2);
  let roundedTip = tipAmount.toFixed(2);

  return (
    <div
      style={{
        width: "920px",
        background: "white",
        borderRadius: "20px",
        padding: "32px",
        display: "flex",
        gap: "48px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <InputBox
        bill={bill}
        setBill={setBill}
        setBtnValue={setBtnValue}
        setPeopleAmount={setPeopleAmount}
        onPercentInp={setPercerntInp}
        percentInp={percentInp}
      >
        <Input title={"Bill"} inputValue={bill} onInputValue={setBill} />
        <PercentageButtons
          btnValue={btnValue}
          onBtnValue={setBtnValue}
          title={"Select Tip %"}
          onPercentInp={setPercerntInp}
          percentInp={percentInp}
        ></PercentageButtons>
        <Input
          title={"Number Of People"}
          inputValue={peopleAmount}
          onInputValue={setPeopleAmount}
        />
      </InputBox>
      <Output totalsum={totalsum} tipAmount={tipAmount}>
        <BillAmount title={"Total"} bill={roundedTotalSum} />
        <BillAmount title={"Tip amount"} bill={roundedTip} />

        <Reset
          onSetBill={setBill}
          onBtnValue={setBtnValue}
          onPeopleAmount={setPeopleAmount}
          onPercentInp={setPercerntInp}
        />
      </Output>
    </div>
  );
}

function InputBox({ children }) {
  return <div style={{ margin: "10px 0 0 0" }}>{children}</div>;
}
function Input({ title, onInputValue, inputValue }) {
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      onInputValue(value);
    } else {
      // If it's not a valid number, set it to a default value (e.g., 0)
      onInputValue(0);
    }
  };
  return (
    <>
      <InputTitle title={title} />
      <div>
        <input
          style={{
            marginTop: "5px",
            background: "rgba(243, 249, 250, 1)",
            outline: "none",
            border: "none",
            borderRadius: "5px",
            width: "100%",
            height: "48px",
            fontSize: "20px",
          }}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </>
  );
}

function InputTitle({ title }) {
  return <h3 style={{ color: "#5E7A7D", fontSize: "16px" }}>{title}</h3>;
}
function PercentageButtons({
  onBtnValue,
  btnValue,
  title,
  onPercentInp,
  percentInp,
}) {
  return (
    <div style={{ margin: "40px 0" }}>
      <InputTitle title={title} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "117px 117px 117px",
          gridTemplateRows: "48px",
          gap: "15px",
          marginTop: "16px",
        }}
      >
        <PercentageBtn
          btnValue={btnValue}
          onBtnValue={onBtnValue}
          amount={5}
          onPercentInp={onPercentInp}
          percentInp={percentInp}
        />
        <PercentageBtn
          btnValue={btnValue}
          onBtnValue={onBtnValue}
          amount={10}
          onPercentInp={onPercentInp}
          percentInp={percentInp}
        />
        <PercentageBtn
          btnValue={btnValue}
          onBtnValue={onBtnValue}
          amount={15}
          onPercentInp={onPercentInp}
          percentInp={percentInp}
        />
        <PercentageBtn
          btnValue={btnValue}
          onBtnValue={onBtnValue}
          amount={25}
          onPercentInp={onPercentInp}
          percentInp={percentInp}
        />
        <PercentageBtn
          btnValue={btnValue}
          onBtnValue={onBtnValue}
          amount={50}
          onPercentInp={onPercentInp}
          percentInp={percentInp}
        />
        <input
          style={{
            background: "#F3F9FA",
            fontSize: "20px",
            padding: "10px",
            outline: "none",
            border: "none",
            borderRadius: "5px",
          }}
          value={percentInp}
          placeholder="Custom"
          type="text"
          onChange={(e) => {
            onPercentInp(e.target.value);
            onBtnValue(null);
          }}
        />
      </div>
    </div>
  );
}
function PercentageBtn({
  amount,
  btnValue,
  onBtnValue,
  onPercentInp,
  percentInp,
}) {
  const isActive = btnValue === amount;
  // Check if this button is active

  const handleClick = () => {
    if (isActive) {
      // If the button is already active, deselect it
      onBtnValue(null);
      onPercentInp(33);
    } else {
      // If the button is not active, select it
      onBtnValue(amount);
      onPercentInp("");
    }
  };

  const buttonStyle = {
    background: isActive ? "#9FE8DF" : "#00474B",
    color: isActive ? "#00474B" : "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "20px",
  };
  return (
    <>
      <button
        value={amount}
        onClick={(e) => {
          handleClick();
        }}
        style={buttonStyle}
      >
        {amount}%
      </button>
    </>
  );
}

function Output({ children }) {
  return (
    <div
      style={{
        background: "#00474B",
        width: "100%",
        padding: "40px",

        borderRadius: "15px",
      }}
    >
      {children}
    </div>
  );
}

function BillAmount({ title, bill }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3 style={{ color: "white" }}>{title}</h3>
        <h5 style={{ color: "#7F9D9F" }}>/ person</h5>
      </div>
      <span
        style={{
          color: "#26C2AE",
          fontSize: "48px",
          fontWeight: "700",
          letterSpacing: "-1",
        }}
      >
        {bill === `Infinity` || bill === `NaN` ? 0 : bill}
        {}
      </span>
    </div>
  );
}

function Reset({ onSetBill, onBtnValue, onPeopleAmount, onPercentInp }) {
  function rstVl() {
    onSetBill(0);
    onBtnValue(0);
    onPeopleAmount(0);
    onPercentInp("");
  }
  return (
    <button
      type="reset"
      onClick={() => rstVl()}
      style={{
        background: "#26C2AE",
        border: "none",
        borderRadius: "5px",
        width: "100%",
        fontSize: "20px",
        color: "#00474B",
        padding: "9px",
        cursor: "pointer",
        marginTop: "125px",
      }}
    >
      Reset
    </button>
  );
}

export default App;
