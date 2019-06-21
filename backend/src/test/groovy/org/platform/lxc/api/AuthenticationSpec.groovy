package org.platform.lxc.api

import groovy.json.JsonSlurper
import org.platform.lxc.MockMvcSpec
import org.platform.lxc.dto.CredentialsDto
import org.platform.lxc.dto.SiginResponseDto
import org.platform.lxc.dto.UserDto
import org.platform.lxc.dto.UserSafeDto
import org.platform.lxc.model.Role
import org.platform.lxc.model.User
import org.platform.lxc.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import spock.lang.Shared

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post


class AuthenticationSpec extends MockMvcSpec {

  @Shared
  static SiginResponseDto token

  @Autowired
  UserService userService

  void setup() {
    UserDto user = new UserDto()
    user.setRoles(List.of(Role.ROLE_ADMIN, Role.ROLE_CLIENT))
    user.setEmail("testlxc@google.com")
    user.setUsername("user")
    user.setPassword("password123")
    user.setPasswordRetype("password123")

    UserDto user2 = new UserDto()
    user2.setRoles(List.of(Role.ROLE_CLIENT))
    user2.setEmail("testlxc2@google.com")
    user2.setUsername("user2")
    user2.setPassword("password123")
    user2.setPasswordRetype("password123")

    userService.signup(user)
    userService.signup(user2)
  }

  def 'should return token on authentication'() {
    when:
    def jwtRequest = new CredentialsDto(username: 'user', password: 'password123')
    def response = mockMvc.perform(post('/api/auth/signin')
        .content(toJson(jwtRequest))
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn().response

    def responseMap = new JsonSlurper().parseText(response.contentAsString)
    token = new SiginResponseDto(token: responseMap.token)
    then:
    response.status == 200
    !token.getToken().isEmpty()
  }

  def 'should authorize using token'() {
    when:
    def response = mockMvc.perform(get('/api/users/me')
        .header("Authorization", "Bearer $token.token"))
        .andReturn().response
    def res = new JsonSlurper().parseText(response.contentAsString)
    def user = new UserSafeDto(username: res.username, roles: res.roles, email: res.email)

    then:
    response.status == 200
    user.username == "user"
    user.email == "testlxc@google.com"
    user.roles.contains(Role.ROLE_ADMIN.name())
    user.roles.contains(Role.ROLE_CLIENT.name())
  }

  def 'should have no permission'() {
    when:
    def jwtRequest = new CredentialsDto(username: 'user2', password: 'password123')
    def response = mockMvc.perform(post('/api/lxc/create')
        .content(toJson(jwtRequest))
        .contentType(MediaType.APPLICATION_JSON))
        .andReturn().response

    then:
    response.status == 403
  }
}
