package org.paas.lxc.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.paas.lxc.dto.UserSafeDto;
import org.paas.lxc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Api(tags = "users")
public class UserApi {

  @Autowired
  private UserService userService;

  @Autowired
  private ModelMapper modelMapper;

  @DeleteMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "")
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Something went wrong"),
      @ApiResponse(code = 403, message = "Access denied"),
      @ApiResponse(code = 404, message = "The user doesn't exist"),
      @ApiResponse(code = 412, message = "Expired or invalid JWT token")
  })
  public String delete(@ApiParam("Username") @PathVariable String username) {
    userService.delete(username);
    return username;
  }

  @GetMapping(value = "/{username}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @ApiOperation(value = "", response = UserSafeDto.class)
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Something went wrong"),
      @ApiResponse(code = 403, message = "Access denied"),
      @ApiResponse(code = 404, message = "The user doesn't exist"),
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")
  })
  public UserSafeDto search(@ApiParam("Username") @PathVariable String username) {
    return modelMapper.map(userService.search(username), UserSafeDto.class);
  }

  @GetMapping(value = "/me")
  @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
  @ApiOperation(value = "", response = UserSafeDto.class)
  @ApiResponses(value = {
      @ApiResponse(code = 400, message = "Something went wrong"),
      @ApiResponse(code = 403, message = "Access denied"),
      @ApiResponse(code = 500, message = "Expired or invalid JWT token")
  })
  public UserSafeDto whoami(HttpServletRequest req) {
    return modelMapper.map(userService.whoami(req), UserSafeDto.class);
  }

}
