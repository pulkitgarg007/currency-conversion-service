package com.pulkit.microservices.currencyservice;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.pulkit.microservices.currencyservice.bean.CurrencyConversionBean;
import com.pulkit.microservices.currencyservice.bean.ProductBean;
import com.pulkit.microservices.currencyservice.client.CurrencyExchangeServiceProxy;

@RestController
public class CurrencyConversionController {
	@Autowired
	private CurrencyExchangeServiceProxy proxy;
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@GetMapping("/currency-converter/from/{from}/to/{to}/quantity/{quantity}")
	public CurrencyConversionBean convertCurrency(@PathVariable String from,@PathVariable String to,
			@PathVariable BigDecimal quantity){
		Map<String,String> urlVariables = new HashMap<>();
		urlVariables.put("from", from);
		urlVariables.put("to",to);
		ResponseEntity<CurrencyConversionBean> responseEntity =new RestTemplate().getForEntity("http://localhost:8000/currency-exchange/from/{from}/to/{to}",
				CurrencyConversionBean.class,urlVariables);
		
		CurrencyConversionBean response = responseEntity.getBody();
		response.setTotalConvertedQuantity(quantity.multiply(response.getConversionMultiple()));
		logger.info("Inside Currency Conversion service ->{}",response);
		return response;
	}
	
	@GetMapping("/products")
	public List<ProductBean>  getProducts(){
		
		List<ProductBean> products = new ArrayList<>();
		
		ProductBean product = new ProductBean();
		product.setDescription("15 gallon capacity rolling garden cart");
		product.setImageUrl("assets/images/garden_cart.png");
		product.setPrice(10.65);
		product.setProductCode("XB-34");
		product.setProductId(5);
		product.setReleaseDate("12th March, 2020");
		product.setProductName("Garden Cart");
		product.setStarRating(2.5);
		
		ProductBean product1 = new ProductBean();
		product1.setDescription("Curved claw steel hammer");
		product1.setImageUrl("assets/images/hammer.png");
		product1.setPrice(4.65);
		product1.setProductCode("XB-50");
		product1.setProductId(4);
		product1.setReleaseDate("10th March, 2019");
		product1.setProductName("Hammer");
		product1.setStarRating(3.5);
		
		ProductBean product2 = new ProductBean();
		product2.setDescription("Curved claw Saw");
		product2.setImageUrl("assets/images/saw.png");
		product2.setPrice(5.65);
		product2.setProductCode("XB-23");
		product2.setProductId(3);
		product2.setReleaseDate("12th April, 2019");
		product2.setProductName("Saw");
		product2.setStarRating(4.0);
		
		ProductBean product3 = new ProductBean();
		product3.setDescription("Curved claw Leaf Rake");
		product3.setImageUrl("assets/images/leaf_rake.png");
		product3.setPrice(10.65);
		product3.setProductCode("XB-21");
		product3.setProductId(2);
		product3.setReleaseDate("12th May, 2020");
		product3.setProductName("Leaf Rake");
		product3.setStarRating(4.5);
		products.add(product);
		products.add(product1);
		products.add(product2);
		products.add(product3);
		
		return products;
	}
	
	@GetMapping("/currency-converter-feign/from/{from}/to/{to}/quantity/{quantity}")
	public CurrencyConversionBean convertCurrencyFeign(@PathVariable String from,@PathVariable String to,
			@PathVariable BigDecimal quantity){
		Map<String,String> urlVariables = new HashMap<>();
		urlVariables.put("from", from);
		urlVariables.put("to",to);
		CurrencyConversionBean bean = proxy.retrieveExchangeValue(from, to);
		bean.setQuantity(quantity);
		bean.setTotalConvertedQuantity(quantity.multiply(bean.getConversionMultiple()));
		logger.info("Inside Currency Conversion service Feign->{}",bean);
		return bean;
	}
}
