package org.platform.lxc

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [App])
class AppSpec extends Specification {

  @Autowired
  ApplicationContext context

  def 'should load context'() {
    expect:
    context != null
  }
}
