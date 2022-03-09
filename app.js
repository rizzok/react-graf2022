const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductRow({product}) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    )
}

function TableStructure({children}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

function ProductTable(props) {

    const products = props.products
    const categories = [...new Set(products.map(product => product.category))]
    const searchValue = props.searchValue
    const showStockOnly = props.stockOnly

    return (
        <TableStructure>
            {categories.map((category) => {
                return <React.Fragment>
                    <ProductCategoryRow key={category} category={category} />

                    {products.map((product) => {
                        if ((showStockOnly && !product.stocked) || !product.name.includes(searchValue)) {
                            return
                        }
                        if (product.category === category) {
                            return <ProductRow key={product.name} product={product} />
                        }
                    })}

                </React.Fragment>
            })}
        </TableStructure>
    )

}

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    handleSearchChange(e) {
        this.props.onSearchValueChange(e.target.value)
    }

    handleCheckboxChange() {
        this.props.onStockOnlyChange()
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input type="text" name="search" id="search" className="form-control" placeholder="Rechercher..."
                        value={this.props.searchValue} onChange={this.handleSearchChange} />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" id="checkbox" className="form-check-input"
                        value={this.props.stockOnly} onChange={this.handleCheckboxChange} />
                    <label htmlFor="checkbox" className="form-check-label">Afficher les produits en stock uniquement</label>
                </div>
            </div>
        )
    }

}

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            stockOnly: false
        }
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this)
        this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this)
    }

    handleSearchValueChange(searchValue) {
        this.setState({searchValue})
    }

    handleStockOnlyChange() {
        this.setState({stockOnly: !this.state.stockOnly})
    }

    render() {
        const searchValue = this.state.searchValue
        const stockOnly = this.state.stockOnly
        return <React.Fragment>
            <SearchBar
                searchValue={searchValue}
                onSearchValueChange={this.handleSearchValueChange}
                stockOnly={stockOnly}
                onStockOnlyChange={this.handleStockOnlyChange} />
            <ProductTable
                searchValue={searchValue}
                stockOnly={stockOnly}
                products={this.props.products} />
        </React.Fragment>
    }

}

function App() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <FilterableProductTable products={PRODUCTS} />
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
