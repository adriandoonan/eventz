const Impressum = () => {
	return (
		<div className="container" style={{ padding: "3rem" }}>
			<h2>Impressum</h2>
			<address>
				Eventz Cooperative eG
				<br />
				123 Event Street
				<br />
				Cityville,
				<br />
				EV 45678 Germany
			</address>
			<p>
				Tel: +49 123 456789
				<br />
				Email: info@eventzcoop.com
				<br />
				Website: eventz.com
			</p>
			<strong>Vertreten durch:</strong>
			<p>
				Vorstandsvorsitzende(r): Anna Müller
				<br />
				Vorstand: Max Schmidt
			</p>
			<strong>Registergericht:</strong>
			<p>Amtsgericht Cityville</p>
			<strong>Registernummer:</strong>
			<p>HRB 123456</p>
			<strong>
				Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
			</strong>
			<p>DE 123 456 789</p>
			<strong>Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV:</strong>
			<p>Anna Müller (Anschrift wie oben)</p>
		</div>
	);
};
export default Impressum;
