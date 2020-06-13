package com.pulkit.microservices.currencyservice;

import java.math.BigDecimal;
import java.util.ArrayList;
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
		product.setDescription("");
		
		ProductBean product1 = new ProductBean();
		product1.setDescription("");
		
		ProductBean product2 = new ProductBean();
		product2.setDescription("");
		
		ProductBean product3 = new ProductBean();
		product3.setDescription("");
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
