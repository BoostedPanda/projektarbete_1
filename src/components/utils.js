const GetCardType = ({type}) => {
	switch (type) {
		case "visa":
			return <img name="bankName" className="visa" src={require(`../logos/${type}.png`)} alt="visa" />
		case "mastercard":
			return <img name="bankName" className="mastercard" src={require(`../logos/${type}.png`)} alt="mastercard"/>
		case "aExpress":
			return <img name="bankName" className="aExpress" src={require(`../logos/${type}.png`)} alt="aExpress"/>
		default:
			return <></>
	}
}

export { GetCardType };