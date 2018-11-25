package react.auth

import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import react.AbstractMvcSpec

class AuthenticationSpec extends AbstractMvcSpec {

  def "unauthenticated users cannot get resource"() {

  }

  @WithMockUser
  def "authenticated users can get resource"() {

  }
}
