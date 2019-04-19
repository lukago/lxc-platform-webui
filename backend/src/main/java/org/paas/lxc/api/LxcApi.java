package org.paas.lxc.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.paas.lxc.dto.LxcCreateDto;
import org.paas.lxc.service.LxcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lxc")
@Api(tags = "lxc")
public class LxcApi {

  @Autowired
  LxcService lxcService;

  @PostMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "")
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Something went wrong"),
  })
  public ResponseEntity<?> createLxc(@ApiParam("Username") @RequestBody LxcCreateDto lxcCreateDto) {
    try {
      lxcService.create(lxcCreateDto.getName());
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

  }
}
