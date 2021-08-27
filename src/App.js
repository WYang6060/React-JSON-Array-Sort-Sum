import "./styles.css";
import { data } from "./define";

export default function App() {
  data.sort((a, b) => {
    const aRegion = a.Region.toUpperCase();
    const bRegion = b.Region.toUpperCase();

    if (aRegion === bRegion) {
      return a.Model.toUpperCase() < b.Model.toUpperCase() ? -1 : 1;
    }

    return aRegion > bRegion ? -1 : 1;
  });

  let result = [];
  let regionIdx = -1;
  let grandTotal = 0;
  let region = "";

  data.forEach((item) => {
    if (region !== item.Region) {
      region = item.Region;
      regionIdx = result.length;
      result.push({ "Region / Model": region, Sales: 0 });
    }
    grandTotal += item.Sales;
    result[regionIdx].Sales += item.Sales;
    result.push({ "Region / Model": item.Model, Sales: item.Sales });
  });
  result.push({ "Region / Model": "Grand Total", Sales: grandTotal });

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>Region / Model</td>
            <td>Sales</td>
          </tr>
        </thead>
        <tbody>
          {result.map((item, idx) => (
            <tr key={idx}>
              <td>{item["Region / Model"]}</td>
              <td>{item["Sales"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
