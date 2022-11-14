import { CSSReset } from "../src/components/CSSReset";
import styled from "styled-components";
import React from "react";
import { BsCalculator } from "react-icons/fa";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    min-height: 400px;
    background-color: #444444;
    border-radius: 32px;
    padding: 32px;
    margin: 0px 0px;
    h1 {
        font-size: 24px;
        margin-top: 16px;
        line-height: 1.2;
        text-align: center;
    }
    flex-shrink: 1;
`;

const StyledFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 0.12);
    padding: 20px 12px;
    border-radius: 16px;
    max-width: 300px;
    margin: 8px 0px;
    border: ${(props) => {
        return props.cheapest ? "3px solid #49a553" : "none";
    }};
    gap: 10px;

    .entry {
        display: flex;
        flex-direction: column;
        align-items: start;
        color: rgba(255, 255, 255, 0.7);
    }

    .entry input {
        background-color: #444444;
        border-radius: 8px;
        border: none;
        padding: 6px 8px;
        color: rgba(255, 255, 255, 0.7);
        max-width: 130px;
    }

    .entry input::placeholder {
        opacity: 0.8;
    }
`;

function ItemForm(props) {
    const [price, setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [cheapest, setCheapest] = React.useState(false);
    props.formsValues.values = {
        ...props.formsValues.values,
        [props.name]: {
            price: {
                value: price,
                setValue: setPrice,
            },
            quantity: {
                value: quantity,
                setValue: setQuantity,
            },
            cheapest: {
                value: cheapest,
                setValue: setCheapest,
            },
        },
    };
    return (
        <StyledFormContainer
            cheapest={props.formsValues.values[props.name].cheapest.value}
        >
            <div className="entry" key="price">
                <label>Preço</label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="R$ 19,99"
                    value={props.formsValues.values[props.name].price.value}
                    onChange={(event) => {
                        props.formsValues.values[props.name].price.setValue(
                            event.target.value
                        );
                    }}
                ></input>
            </div>
            <div className="entry" key="quantity">
                <label>Quantidade</label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="800"
                    value={props.formsValues.values[props.name].quantity.value}
                    onChange={(event) => {
                        props.formsValues.values[props.name].quantity.setValue(
                            event.target.value
                        );
                    }}
                ></input>
            </div>
        </StyledFormContainer>
    );
}

const StyledButtons = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: center;
    gap: 12px;
    button {
        background-color: rgba(255, 255, 255, 0.12);
        color: #fff;
        border: none;
        padding: 10px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        font-size: 18px;
    }
    button:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

function ActionButtons(props) {
    return (
        <StyledButtons>
            <button
                onClick={() => {
                    props.formsNumber.setValue(props.formsNumber.value + 1);
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    calculate(props.formsValues);
                }}
            >
                C
            </button>
            <button
                onClick={() => {
                    resetForm(props.formsValues);
                }}
            >
                R
            </button>
        </StyledButtons>
    );
}

function resetForm(formsValues) {
    for (const [key, value] of Object.entries(formsValues.values)) {
        value.price.setValue("");
        value.quantity.setValue("");
        value.cheapest.setValue(false);
    }
}

function calculate(formsValues) {
    let cheapest;
    let cheapestValue = Infinity;
    for (const [key, value] of Object.entries(formsValues.values)) {
        if (value.price.value === "" || value.quantity.value === "") {
            console.log(`ignoring n° ${key}`);
        } else {
            const pricePerUn =
                Number(value.price.value.replace(",", ".")) /
                Number(value.quantity.value.replace(",", "."));

            if (pricePerUn < cheapestValue) {
                cheapestValue = pricePerUn;
                cheapest = value;
            }
            value.cheapest.setValue(false);
        }
    }
    if (cheapestValue === Infinity) {
        alert("Enter valid data!");
    } else {
        cheapest.cheapest.setValue(true);
    }
}

function generateFormArray(n, formsValues) {
    let arr = [];
    if (n > 7) {
        alert("7 items is the limit!");
        n = 7;
    }
    for (let i = 0; i < n; i++) {
        arr.push(
            <ItemForm formsValues={formsValues} name={i + 1} key={i + 1} />
        );
    }
    return arr;
}

function HomePage() {
    const formsHook = React.useState(2);
    const formsValuesHook = React.useState({});
    const formsValues = {
        values: formsValuesHook[0],
        setValues: formsValuesHook[1],
    };
    const formsNumber = {
        value: formsHook[0],
        setValue: formsHook[1],
    };

    return (
        <>
            <CSSReset />
            <StyledContainer>
                <h1>Adicione os preços e quantidades</h1>
                {generateFormArray(formsNumber.value, formsValues)}
                <ActionButtons
                    formsNumber={formsNumber}
                    formsValues={formsValues}
                ></ActionButtons>
            </StyledContainer>
        </>
    );
}

export default HomePage;
