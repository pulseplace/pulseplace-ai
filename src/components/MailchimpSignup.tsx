
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MailchimpSignupProps {
  title?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

const MailchimpSignup = ({
  title = "Join the Beta",
  buttonText = "Get Certified",
  placeholder = "Your work email",
  className = ""
}: MailchimpSignupProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div id="mc_embed_signup">
        <form 
          action="https://YOUR-USERNAME.usXX.list-manage.com/subscribe/post?u=XXXXXXX&id=XXXXXXX"
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form"
          className="validate flex flex-col space-y-4" 
          target="_blank" 
          noValidate
        >
          <div id="mc_embed_signup_scroll" className="w-full">
            {title && (
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
                {title}
              </h2>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                name="EMAIL" 
                id="mce-EMAIL"
                placeholder={placeholder} 
                required
                className="flex-grow"
              />
              
              <div className="clear">
                <Button 
                  type="submit" 
                  name="subscribe"
                  id="mc-embedded-subscribe" 
                  className="bg-pulse-gradient hover:opacity-90 w-full sm:w-auto"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            
            {/* Hidden field to prevent bot signups */}
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input type="text" name="b_XXXXXX_XXXXXX" tabIndex={-1} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailchimpSignup;
