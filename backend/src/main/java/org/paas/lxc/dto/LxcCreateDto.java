package org.paas.lxc.dto;

import io.swagger.annotations.ApiModelProperty;

public class LxcCreateDto {

  @ApiModelProperty()
  private String name;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
