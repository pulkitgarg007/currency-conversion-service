package com.pulkit.microservices.currencyservice.bean;

import java.math.BigDecimal;


public class CurrencyConversionBean {
	
	private Long id;
	private String from;
	private String to;
	private BigDecimal conversionMultiple;
	private int port;
	private BigDecimal quantity;
	private BigDecimal totalConvertedQuantity;
	
	public CurrencyConversionBean() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public BigDecimal getConversionMultiple() {
		return conversionMultiple;
	}
	public void setConversionMultiple(BigDecimal conversionMultiple) {
		this.conversionMultiple = conversionMultiple;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public BigDecimal getQuantity() {
		return quantity;
	}
	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}
	public BigDecimal getTotalConvertedQuantity() {
		return totalConvertedQuantity;
	}
	public void setTotalConvertedQuantity(BigDecimal totalConvertedQuantity) {
		this.totalConvertedQuantity = totalConvertedQuantity;
	}
	public CurrencyConversionBean(Long id, String from, String to, BigDecimal conversionMultiple, int port,
			BigDecimal quantity, BigDecimal totalConvertedQuantity) {
		super();
		this.id = id;
		this.from = from;
		this.to = to;
		this.conversionMultiple = conversionMultiple;
		this.port = port;
		this.quantity = quantity;
		this.totalConvertedQuantity = totalConvertedQuantity;
	}
	
	

}
